import ModalWindow from '../modalWindow.js';
import Recognizer from './recognition.js';
import Ws from '../../libs/websocket.js';

import { DEFAULT_GHOST_SPEED, DEFAULT_GHOST_DAMAGE, PLAYER_INITIAL_HP } from '../constants.js';
import { SCORE_FOR_SYMBOL, SCORE_FOR_GHOST } from '../constants.js';

const symbolImgWidth = 60;

export default class Game {
    /*
     * this.lastDrawing - последний считанный нарисованный символ
     * this.recognizer - распознаватель нарисованных символов
     * this.bindedResizer - обработчик изменения размеров экрана для корректного ререндера
     * this.state - состояние игры
     * @param {boolean} isMulti - true - мультиплеер
     */
    constructor(eventBus, isMulti = false) {
        this.isMulti = isMulti;
        this.localEventBus = eventBus;

        this.MW = new ModalWindow();
        this.canvas = document.getElementsByClassName('temp_class_canvas')[0];
        this.ctx = this.canvas.getContext('2d');

        // координата Y оси X
        const offsetByY = this.canvas.height / 40;
        this.axisY = this.canvas.clientHeight - offsetByY;
        // координаты блока с сердечками
        this.heartsBlockY = this.canvas.height / 4;

        // расстояние между головой призрака и символами
        this.symbolsOffset = this.canvas.height / 12;  // расстояние между призраком и символами над его головой

        this.lastDrawing = 0;

        this.recognizer = new Recognizer();

        this.bindedResizer = this.resizer.bind(this);
        window.addEventListener('resize', this.bindedResizer);
        this.resizer();

        this.requestID = null;

        this.playerImg = document.getElementById('player-sprite');
        this.ghostLeftImg = document.getElementById('ghost-left-sprite');
        this.ghostRightImg = document.getElementById('ghost-right-sprite');
        this.heartImg = document.getElementById('heart-sprite');

        this.symbolLR = document.getElementById('symbol_LR');
        this.symbolTD = document.getElementById('symbol_TD');
        this.symbolDTD = document.getElementById('symbol_DTD');

        this.localEventBus.getEvent('updateState', this.setState.bind(this));

        this.lastTime = Date.now();

        if (!this.isMulti) {  // если синглплеер
            this.state = {
                player: {
                    sprite: this.playerImg,
                    x: this.canvas.width / 2 - this.playerImg.width / 2,
                    hp: PLAYER_INITIAL_HP
                },
                ghosts: [],
    
                score: 0,
                gameTime: 0,
                isGameOver: false
            };

            this.gameLoop();
        } else {
            console.log('creating ws');
            this.ws = new Ws(this.localEventBus);
            // this.gameLoop();
        }
    }

    setState(state) {
        console.log(state);
        this.state = {
            Players: [{
                sprite: this.playerImg,
                x: (this.canvas.width -  this.playerImg.width) / 2 - 100,
                id: state.Players[0].id,
                hp: state.Players[0].hp,
                score: state.Players[0].score,
            }, {
                sprite: this.playerImg,
                x: (this.canvas.width -  this.playerImg.width) / 2 - 100,
                id: state.Players[1].id,
                hp: state.Players[1].hp,
                score: state.Players[1].score,
            }],
            ghosts: state.Objects.items,
            gameTime: 0,
            isGameOver: false
        };

        this.gameLoop();
    }

    resizer() {
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;

        this.recognizer.gcanvas.height = window.innerHeight;
        this.recognizer.gcanvas.width = window.innerWidth;
    }

    destroy() {
        if (this.requestID) {
            cancelAnimationFrame(this.requestID);
        }
        console.log('called');
        this.recognizer.destroyRecognizer();
        
        console.log('final score is', this.state.score);
        window.removeEventListener('resize', this.bindedResizer);
    }

    gameLoop() {
        let now = Date.now();
        let dt = (now - this.lastTime) / 1000.0;

        if (!this.isMulti) {
            this.updateSingle(dt);
            this.renderSingle();
        } else {
            this.renderMulti();
        }   

        if (this.state.isGameOver === true) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.destroy();
            let finalScore = this.state.score;
            this.MW.createModal('Game single end');
            const scoreElement = document.getElementsByClassName('js-set-final-score')[0];
            scoreElement.innerText = `Your score is : ${finalScore}`;
            return;
        }

        this.lastTime = now;
        this.requestID = requestAnimationFrame(this.gameLoop.bind(this));
    }

    updateSingle(dt) {
        this.state.gameTime += dt;

        // Почему это тут? Вот почему: в конструкторе стейта
        // картинка не успевает прогрузиться, ширина равна 0 и не получается вычислить Х игрока
        // Пока хз, что делать с этим
        this.state.player.x = this.canvas.width / 2 - this.playerImg.width / 2;

        // TODO: убрать this.state.ghosts.length === 0, придумать, как сделать больше одного призрака с каждой стороны экрана
        if (Math.random() < 1 - Math.pow(.993, this.state.gameTime)) {
            if (this.state.ghosts.length === 0) {  // если призраков нет
                let generatedDirection = this.generateDirection();
                this.state.ghosts.push(this.createGhost(generatedDirection));
            } else if (this.state.ghosts.length === 1) {
                if (this.state.ghosts[0].speed < 0) {  // если есть призрак справа
                    this.state.ghosts.push(this.createGhost('left'));
                } else if (this.state.ghosts[0].speed > 0) {  // если есть призрак слева
                    this.state.ghosts.push(this.createGhost('right'));
                }
            }
        }

        //  убиваем призраков
        for (let i = 0; i < this.state.ghosts.length; i++) {
            // сносим символ
            if (this.state.ghosts[i].symbolsQueue[0] === this.lastDrawing) {
                this.state.ghosts[i].symbolsQueue.shift();
                this.state.score += SCORE_FOR_SYMBOL;
            }

            // убили
            if (this.state.ghosts[i].symbolsQueue.length === 0) {
                if (this.state.ghosts[i].speed > 0) {
                    this.ctx.clearRect(0, this.axisY - this.state.ghosts[i].sprite.height - symbolImgWidth - this.symbolsOffset,
                        this.state.player.x, this.state.ghosts[i].sprite.height + symbolImgWidth + this.symbolsOffset);
                } else if (this.state.ghosts[i].speed < 0) {
                    this.ctx.clearRect(this.state.player.x + this.state.player.sprite.width,
                        this.axisY - this.state.ghosts[i].sprite.height  - symbolImgWidth - this.symbolsOffset,
                        this.canvas.width / 2, this.state.ghosts[i].sprite.height + symbolImgWidth + this.symbolsOffset);
                }
                this.state.ghosts.splice(i, 1);
                this.state.score += SCORE_FOR_GHOST;
            }
        }

        this.lastDrawing = 0;

        // двигаем призраков и дамажим героя
        for (let i = 0; i < this.state.ghosts.length; i++) {
            if (this.state.ghosts.length !== 0) {
                if (this.state.ghosts[i].speed > 0) {
                    if (this.state.ghosts[i].x + this.state.ghosts[i].sprite.width < this.state.player.x) {
                        this.moveGhost(this.state.ghosts[i], dt);
                    } else {
                        this.state.player.hp -= this.state.ghosts[i].damage;
                        this.state.ghosts.splice(i, 1);
                    }
                } else if (this.state.ghosts[i].speed < 0) {
                    if (this.state.ghosts[i].x > this.state.player.x + this.state.player.sprite.width) {
                        this.moveGhost(this.state.ghosts[i], dt);
                    } else {
                        this.state.player.hp -= this.state.ghosts[i].damage;
                        this.state.ghosts.splice(i, 1);
                    }
                }
            }

            if (this.state.player.hp === 0) {
                this.state.isGameOver = true;
                this.localEventBus.callEvent('gameOver');
                return;
            }
        }
    }

    renderSingle() {
        let heartsBetweenOffset = this.heartImg.width / 4;

        let heartOffset = this.heartImg.width;
        this.ctx.clearRect(0, this.heartsBlockY,
            (this.heartImg.width + heartsBetweenOffset) * PLAYER_INITIAL_HP + heartOffset, this.heartImg.height);
        for (let i = this.state.player.hp; i > 0; i--) {
            this.ctx.drawImage(this.heartImg, (heartOffset + heartsBetweenOffset) * i, this.heartsBlockY,
                this.heartImg.width, this.heartImg.height);
        }

        // игрок
        this.ctx.clearRect(this.state.player.x, this.axisY - this.state.player.sprite.height,
            this.state.player.sprite.width, this.state.player.sprite.height);
        this.ctx.drawImage(this.state.player.sprite, this.state.player.x, 
            this.axisY - this.state.player.sprite.height);

        // призраки

        for (let i = 0; i < this.state.ghosts.length; i++) {
            let leftSymbolOffset = (this.state.ghosts[i].sprite.width / 2 - this.state.ghosts[i].symbolsQueue.length * symbolImgWidth / 2);

            if (this.state.ghosts[i].speed > 0) {
                // очистка + рендер призрака
                this.ctx.clearRect(0, this.axisY - this.state.ghosts[i].sprite.height,
                    this.state.player.x, this.state.ghosts[i].sprite.height);
                this.ctx.drawImage(this.state.ghosts[i].sprite,
                    this.state.ghosts[i].x,this.axisY - this.state.ghosts[i].sprite.height);

                // очистка + рендер символов над призраком
                this.ctx.clearRect(0,
                    this.axisY - this.state.ghosts[i].sprite.height - symbolImgWidth - this.symbolsOffset,
                    this.canvas.width / 2, symbolImgWidth);

                for (let j = 0; j < this.state.ghosts[i].symbolsQueue.length; j++) {
                    switch (this.state.ghosts[i].symbolsQueue[j]) {
                        case 2:  // LR - горизонтальный символ left-right
                            this.ctx.drawImage(this.symbolLR,
                                this.state.ghosts[i].x + symbolImgWidth * j + leftSymbolOffset,
                                this.axisY - this.state.ghosts[i].sprite.height - symbolImgWidth);
                            break;
                        case 3:  // TD - вертикальный символ - top-down
                            this.ctx.drawImage(this.symbolTD,
                                this.state.ghosts[i].x + symbolImgWidth * j + leftSymbolOffset,
                                this.axisY - this.state.ghosts[i].sprite.height - symbolImgWidth);
                            break;
                        case 4:  // DTD - стрелка - down-top-down
                            this.ctx.drawImage(this.symbolDTD,
                                this.state.ghosts[i].x + symbolImgWidth * j + leftSymbolOffset,
                                this.axisY - this.state.ghosts[i].sprite.height - symbolImgWidth);
                            break;
                    }
                }
            } else if (this.state.ghosts[i].speed < 0) {  // все то же самое, что и для призрака слева
                this.ctx.clearRect(this.state.player.x + this.state.player.sprite.width, 
                    this.axisY - this.state.ghosts[i].sprite.height,
                    this.canvas.width / 2, this.state.ghosts[i].sprite.height);

                this.ctx.drawImage(this.state.ghosts[i].sprite,
                    this.state.ghosts[i].x, this.axisY - this.state.ghosts[i].sprite.height);

                this.ctx.clearRect(this.state.player.x + this.state.player.sprite.width / 2,
                    this.axisY - this.state.ghosts[i].sprite.height - symbolImgWidth - this.symbolsOffset,
                    this.canvas.width / 2, symbolImgWidth);
                for (let j = 0; j < this.state.ghosts[i].symbolsQueue.length; j++) {
                    switch (this.state.ghosts[i].symbolsQueue[j]) {
                        case 2:  // LR
                            this.ctx.drawImage(this.symbolLR,
                                this.state.ghosts[i].x + symbolImgWidth * j + leftSymbolOffset,
                                this.axisY - this.state.ghosts[i].sprite.height - symbolImgWidth - this.symbolsOffset);
                            break;
                        case 3:  // TD
                            this.ctx.drawImage(this.symbolTD,
                                this.state.ghosts[i].x + symbolImgWidth * j + leftSymbolOffset,
                                this.axisY - this.state.ghosts[i].sprite.height - symbolImgWidth - this.symbolsOffset);
                            break;
                        case 4:  // DTD
                            this.ctx.drawImage(this.symbolDTD,
                                this.state.ghosts[i].x + symbolImgWidth * j + leftSymbolOffset,
                                this.axisY - this.state.ghosts[i].sprite.height - symbolImgWidth - this.symbolsOffset);
                            break;
                    }
                }
            }
        }

        if (this.recognizer.gcanvas) {
            if (this.recognizer.mouseIsDown) {  // отрисовываем символы на втором канвасе
                this.recognizer.gctx.clearRect(0, 0, this.recognizer.gcanvas.scrollWidth, this.recognizer.gcanvas.scrollHeight);
                this.recognizer.jager.drawPatch(this.recognizer.path, this.recognizer.gctx, this.recognizer.jager.recognise(this.recognizer.path));
            }
        }

        if (this.recognizer.lastDrawing !== null) {
            this.lastDrawing = this.recognizer.lastDrawing;
            this.recognizer.lastDrawing = null; // чтобы не сносить сразу все одинаковые символы, идущие подряд
        }
    }

    renderMulti() {
        const offsetByY = this.canvas.height / 40;  // смещение по Y - расстояние от нижнего края экрана

        let heartsBetweenOffset = this.heartImg.width / 2;
        let leftHeartOffset = 0;
        let rightHeartOffset = 0;
        let heartsUpperOffset = this.canvas.height / 10;

        // координата Y оси X
        const playerY = this.canvas.height - offsetByY;

        const offsetBetweenPlayers = this.canvas.width / 80;

        // Блок первого игрока

        // вывод сердец здоровья
        this.ctx.clearRect(0, 0, this.heartImg.width * 4,this.heartImg.height + heartsUpperOffset);
        for (let i = this.state.Players[0].hp / 100; i > 0; i--) {
            this.ctx.drawImage(this.heartImg, heartsBetweenOffset + leftHeartOffset,
                heartsUpperOffset, this.heartImg.width, this.heartImg.height);
            leftHeartOffset += this.heartImg.width;
        }

        // позиция игрока
        let leftPlayerX = this.canvas.width / 2 - this.state.Players[0].sprite.width - offsetBetweenPlayers / 2;
        this.state.Players[0].x = leftPlayerX;

        this.ctx.clearRect(leftPlayerX, playerY - this.state.Players[0].sprite.height,
            this.state.Players[0].sprite.width, 
            this.state.Players[0].sprite.height);

        this.ctx.drawImage(this.state.Players[0].sprite, leftPlayerX,
            playerY - this.state.Players[0].sprite.height);

        // Блок второго игрока

        // вывод сердец здоровья
        this.ctx.clearRect( this.canvas.width - this.heartImg.width * 3 - heartsBetweenOffset, 0,
            this.heartImg.width * 3 + heartsBetweenOffset,this.heartImg.height + heartsUpperOffset);
        for (let i = this.state.Players[1].hp / 100; i > 0; i--) {
            this.ctx.drawImage(this.heartImg, this.canvas.width - this.heartImg.width * 3 - heartsBetweenOffset + rightHeartOffset,
                heartsUpperOffset, this.heartImg.width, this.heartImg.height);
            rightHeartOffset += this.heartImg.width;
        }

        // позиция игрока
        let rightPlayerX = leftPlayerX + this.state.Players[0].sprite.width + offsetBetweenPlayers * 3 / 2;
        this.state.Players[1].x = rightPlayerX;

        this.ctx.clearRect(rightPlayerX, playerY - this.state.Players[1].sprite.height,
            this.state.Players[1].sprite.width, 
            this.state.Players[1].sprite.height);
            
        this.ctx.drawImage(this.state.Players[1].sprite, rightPlayerX,
            playerY - this.state.Players[1].sprite.height);


        // Призраки
        const ghostY = this.canvas.height - offsetByY;
        const symbolsOffset = 30;  // расстояние между призраком и символами над его головой

        this.ctx.font = '20pt Comfortaa-Regular';
        this.ctx.fillStyle = 'white';
        let symbolsToShow = '';

        for (let i = 0; i < this.state.ghosts.length; i++) {
            if (this.state.ghosts[i].speed > 0) {
                this.state.ghosts[i].sprite = this.ghostRightImg;
                this.ctx.clearRect(0, this.canvas.height / 2,
                    this.state.Players[0].x,
                    this.canvas.height / 2);
                this.ctx.drawImage(this.state.ghosts[i].sprite, this.state.ghosts[i].x - this.state.ghosts[i].sprite.width, 
                    ghostY - this.state.ghosts[i].sprite.height);
                symbolsToShow = this.state.ghosts[i].symbolsQueue.join(' ');
                this.ctx.fillText(symbolsToShow, this.state.ghosts[i].x - this.state.ghosts[i].sprite.width / 2 - this.ctx
                    .measureText(this.state.ghosts[i].symbolsQueue).width / 2, ghostY - this.state.ghosts[i].sprite.height - symbolsOffset);
            } else if (this.state.ghosts[i].speed < 0) {
                this.state.ghosts[i].sprite = this.ghostLeftImg;
                this.ctx.clearRect(this.state.Players[1].x + this.state.Players[1].sprite.width,
                    this.canvas.height / 2, this.canvas.width / 2, this.canvas.height / 2);
                this.ctx.drawImage(this.state.ghosts[i].sprite, this.state.ghosts[i].x, ghostY - this.state.ghosts[i].sprite.height);
                symbolsToShow = this.state.ghosts[i].symbolsQueue.join(' ');
                this.ctx.fillText(symbolsToShow, this.state.ghosts[i].x + this.state.ghosts[i].sprite.width / 2 - this.ctx
                    .measureText(this.state.ghosts[i].symbolsQueue).width / 2, ghostY - this.state.ghosts[i].sprite.height - symbolsOffset);
            }
        }
    }

    generateDirection() {
        return Math.floor(Math.random() * 2) === 0 ? 'left' : 'right';
    }

    generateDrawingsSequence() {
        const maxSymbolsLength = 2, minSymbolsLength = 6;
        let generatedSymbolsLength = Math.floor(Math.random() * (maxSymbolsLength - minSymbolsLength + 1)) + minSymbolsLength;

        let generatedDrawings = [];
        for (let i = 0; i < generatedSymbolsLength; i++) {
            let generatedSymbolNumber = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
            switch (generatedSymbolNumber) {
                case 2:
                    generatedDrawings.push(2);  // LR
                    break;
                case 3:
                    generatedDrawings.push(3);  // TD
                    break;
                case 4:
                    generatedDrawings.push(4);  // DTD
                    break;
            }
        }
        return generatedDrawings;
    }

    createGhost(direction) {
        if (direction === 'left') {
            return {
                x: -this.ghostLeftImg.width,
                speed: DEFAULT_GHOST_SPEED,
                damage: DEFAULT_GHOST_DAMAGE,
                sprite: this.ghostLeftImg,
                symbolsQueue: this.generateDrawingsSequence()
            };
        } else if (direction === 'right') {
            return {
                x: this.canvas.width + this.ghostRightImg.width,
                speed: -DEFAULT_GHOST_SPEED,
                damage: DEFAULT_GHOST_DAMAGE,
                sprite: this.ghostRightImg,
                symbolsQueue: this.generateDrawingsSequence()
            };
        }
    }

    moveGhost(ghost, dt) {
        ghost.x += ghost.speed * dt;
    }
}