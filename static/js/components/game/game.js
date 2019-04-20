import { DEFAULT_GHOST_SPEED, DEFAULT_GHOST_DAMAGE, PLAYER_INITIAL_HP } from '../constants.js';
import Ws from '../../libs/websocket.js';

export default class Game {
    /**
     * this.lastButtonPressed - последняя нажатая клавиша
     * this.bindedButtonsHandler - обработчик нажатия на клавиши
     * this.bindedResizer - обработчик изменения размеров экрана для корректного ререндера
     * this.state - состояние игры
     */
    constructor(eventBus, players = {}) {
        this.localEventBus = eventBus;

        this.canvas = document.getElementsByClassName('temp_class_canvas')[0];
        this.ctx = this.canvas.getContext('2d');

        this.playerImg = document.getElementById('player-sprite');
        this.secondPlayerImg = document.getElementById('player-sprite_second');

        this.ghostLeftImg = document.getElementById('ghost-left-sprite');
        this.ghostRightImg = document.getElementById('ghost-right-sprite');
        this.heartImg = document.getElementById('heart-sprite');

        console.log('input in constructor', Object.keys(players));
        console.log('pl', players);

        this.state = {
            player: {
                sprite: this.playerImg,
                x: (this.canvas.width -  this.playerImg.width) / 2,
                hp: PLAYER_INITIAL_HP
            },
            ghosts: [],

            // TODO: на бэке этих полей нет - решить, нужны ли
            score: 0,
            gameTime: 0,
            isGameOver: false
        };
        this.isSingle = true;

        if (!this.isSingle) {
            this.ws = new Ws(this.localEventBus);
        }

        this.lastButtonPressed = '';

        this.bindedButtonsHandler = this.buttonsHandler.bind(this);
        window.addEventListener('keydown', this.bindedButtonsHandler);
        this.localEventBus.getEvent('updateState', this.setState.bind(this));

        this.bindedResizer = this.resizer.bind(this);
        window.addEventListener('resize', this.bindedResizer);
        this.resizer();

        this.requestID = null;

        this.lastTime = Date.now();

        this.localEventBus.getEvent('callingGameWS', this.gameLoop.bind(this));

        if (this.isSingle) {
            this.gameLoop();
        }
    }

    setState(inputState) {
        this.state = {
            firstPlayer: {
                sprite: this.playerImg,
                x: (this.canvas.width -  this.playerImg.width) / 2 - 100,
                nickname: inputState.Players[0].id,
                hp: inputState.Players[0].hp,
                score: inputState.Players[0].score
            },
            secondPlayer: {
                sprite: this.playerImg,
                x: (this.canvas.width -  this.playerImg.width) / 2 - 100,
                nickname: inputState.Players[1].id,
                hp: inputState.Players[1].hp,
                score: inputState.Players[1].score 
            },

            ghosts: inputState.Objects.Items,
            gameTime: 0,
            isGameOver: false
        };
        this.isSingle = false;
        this.localEventBus.callEvent('callingGameWS');
    }

    resizer() {
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
    }

    destroy() {
        if (this.requestID) {
            cancelAnimationFrame(this.requestID);
        }
        console.log('final score is', this.state.score);
        window.removeEventListener('resize', this.bindedResizer);
        window.removeEventListener('keydown', this.bindedButtonsHandler);
    }

    gameLoop() {
        let now = Date.now();
        let dt = (now - this.lastTime) / 1000.0;

        // this.update(dt);
        if (this.isSingle) {
            this.updateSingle(dt);
            this.renderSingle();
        } else {
            this.renderMulti();
        }

        if (this.state.isGameOver === true) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.destroy();
            return;
        }

        this.lastTime = now;
        this.requestID = requestAnimationFrame(this.gameLoop.bind(this));
    }

    updateSingle(dt)  {
    this.state.gameTime += dt;

    // TODO: убрать this.state.ghosts.length === 0, придумать, как сделать больше одного призрака с каждой стороны экрана
    if (Math.random() < 1 - Math.pow(.993, this.state.gameTime)) {
        if (this.state.ghosts.length === 0) {  // если призраков нет
            let generatedDirection = this.generateDirection();

            if (generatedDirection === 'left') {
                this.state.ghosts.push({
                    x: this.ghostLeftImg.width / 2,
                    speed: DEFAULT_GHOST_SPEED,
                    damage: DEFAULT_GHOST_DAMAGE,
                    sprite: this.ghostLeftImg,
                    symbols: this.generateSymbolsSequence()
                });
            } else if (generatedDirection === 'right') {
                this.state.ghosts.push({
                    x: this.canvas.width + this.ghostLeftImg.width / 2,
                    speed: -DEFAULT_GHOST_SPEED,
                    damage: DEFAULT_GHOST_DAMAGE,
                    sprite: this.ghostRightImg,
                    symbols: this.generateSymbolsSequence()
                });
            }
        } else if (this.state.ghosts.length === 1) {
            if (this.state.ghosts[0].speed < 0) {  // если есть призрак справа
                this.state.ghosts.push({
                    x: this.ghostLeftImg.width / 2,
                    speed: DEFAULT_GHOST_SPEED,
                    damage: DEFAULT_GHOST_DAMAGE,
                    sprite: this.ghostLeftImg,
                    symbols: this.generateSymbolsSequence()
                });
            } else if (this.state.ghosts[0].speed > 0) {  // если есть призрак слева
                this.state.ghosts.push({
                    x: this.canvas.width + this.ghostLeftImg.width / 2,
                    speed: -DEFAULT_GHOST_SPEED,
                    damage: DEFAULT_GHOST_DAMAGE,
                    sprite: this.ghostRightImg,
                    symbols: this.generateSymbolsSequence()
                });
            }
        }
    }


    //  убиваем призраков
    for (let i = 0; i < this.state.ghosts.length; i++) {
        // сносим символ
        if (this.state.ghosts[i].symbols[0] === this.lastButtonPressed) {
            this.state.ghosts[i].symbols = this.state.ghosts[i].symbols.slice(1, this.state.ghosts[i].symbols.length + 1);
            this.state.score += 10;
        }

        // убили
        if (this.state.ghosts[i].symbols.length === 0) {
            if (this.state.ghosts[i].speed > 0) {
                this.ctx.clearRect(0, this.canvas.height / 2, this.canvas.width / 2 - this.state.player.sprite.width / 2, this.canvas.height / 2);
            } else if (this.state.ghosts[i].speed < 0) {
                this.ctx.clearRect(this.canvas.width / 2 + this.state.player.sprite.width / 2 - 6, this.canvas.height / 2, this.canvas.width / 2, this.canvas.height / 2);
            }
            this.state.ghosts.splice(i, 1);
            this.state.score += 100;
        }
    }
    this.lastButtonPressed = '';

    // двигаем призраков и дамажим героя
    for (let i = 0; i < this.state.ghosts.length; i++) {
        if (this.state.ghosts.length !== 0) {
            if (this.state.ghosts[i].speed > 0) {
                if (this.state.ghosts[i].x < this.state.player.x) {
                    this.state.ghosts[i].x += this.state.ghosts[i].speed * dt;
                } else {
                    this.state.player.hp -= this.state.ghosts[i].damage;
                }
            } else if (this.state.ghosts[i].speed < 0) {
                if (this.state.ghosts[i].x > this.state.player.x + this.state.player.sprite.width) {
                    this.state.ghosts[i].x += this.state.ghosts[i].speed * dt;
                } else {
                    this.state.player.hp -= this.state.ghosts[i].damage;
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
        for (let i = this.state.firstPlayer.hp / 100; i > 0; i--) {
            this.ctx.drawImage(this.heartImg, heartsBetweenOffset + leftHeartOffset,
                heartsUpperOffset, this.heartImg.width, this.heartImg.height);
            leftHeartOffset += this.heartImg.width;
        }

        // позиция игрока
        let leftPlayerX = this.canvas.width / 2 - this.state.firstPlayer.sprite.width - offsetBetweenPlayers / 2;
        this.state.firstPlayer.x = leftPlayerX;

        this.ctx.clearRect(leftPlayerX, playerY - this.state.firstPlayer.sprite.height,
            this.state.firstPlayer.sprite.width, 
            this.state.firstPlayer.sprite.height);

        this.ctx.drawImage(this.state.firstPlayer.sprite, leftPlayerX,
            playerY - this.state.firstPlayer.sprite.height);

        // Блок второго игрока

        // вывод сердец здоровья
        this.ctx.clearRect( this.canvas.width - this.heartImg.width * 3 - heartsBetweenOffset, 0,
            this.heartImg.width * 3 + heartsBetweenOffset,this.heartImg.height + heartsUpperOffset);
        for (let i = this.state.secondPlayer.hp / 100; i > 0; i--) {
            this.ctx.drawImage(this.heartImg, this.canvas.width - this.heartImg.width * 3 - heartsBetweenOffset + rightHeartOffset,
                heartsUpperOffset, this.heartImg.width, this.heartImg.height);
            rightHeartOffset += this.heartImg.width;
        }

        // позиция игрока
        let rightPlayerX = leftPlayerX + this.state.firstPlayer.sprite.width + offsetBetweenPlayers * 3 / 2;
        this.state.secondPlayer.x = rightPlayerX;

        this.ctx.clearRect(rightPlayerX, playerY - this.state.secondPlayer.sprite.height,
            this.state.secondPlayer.sprite.width, 
            this.state.secondPlayer.sprite.height);
            
        this.ctx.drawImage(this.state.secondPlayer.sprite, rightPlayerX,
            playerY - this.state.secondPlayer.sprite.height);


        // Призраки
        const ghostY = this.canvas.height - offsetByY;
        const symbolsOffset = 30;  // расстояние между призраком и символами над его головой

        this.ctx.font = '20pt Comfortaa-Regular';
        this.ctx.fillStyle = 'white';
        let symbolsToShow = '';

        for (let i = 0; i < this.state.ghosts.length; i++) {
            if (this.state.ghosts[i].speed > 0) {
                this.ctx.clearRect(0, this.canvas.height / 2,
                    this.state.firstPlayer.x,
                    this.canvas.height / 2);
                this.ctx.drawImage(this.state.ghosts[i].sprite, this.state.ghosts[i].x - this.state.ghosts[i].sprite.width, 
                    ghostY - this.state.ghosts[i].sprite.height);
                symbolsToShow = this.state.ghosts[i].symbols.join(' ');
                this.ctx.fillText(symbolsToShow, this.state.ghosts[i].x - this.state.ghosts[i].sprite.width / 2 - this.ctx
                    .measureText(this.state.ghosts[i].symbols).width / 2, ghostY - this.state.ghosts[i].sprite.height - symbolsOffset);
            } else if (this.state.ghosts[i].speed < 0) {
                this.ctx.clearRect(this.state.secondPlayer.x + this.state.secondPlayer.sprite.width,
                    this.canvas.height / 2, this.canvas.width / 2, this.canvas.height / 2);
                this.ctx.drawImage(this.state.ghosts[i].sprite, this.state.ghosts[i].x, ghostY - this.state.ghosts[i].sprite.height);
                symbolsToShow = this.state.ghosts[i].symbols.join(' ');
                this.ctx.fillText(symbolsToShow, this.state.ghosts[i].x + this.state.ghosts[i].sprite.width / 2 - this.ctx
                    .measureText(this.state.ghosts[i].symbols).width / 2, ghostY - this.state.ghosts[i].sprite.height - symbolsOffset);
            }
        }
    }

    renderSingle() {
        const offsetByY = this.canvas.height / 40;  // смещение по Y - расстояние от нижнего края экрана

    let heartsBetweenOffset = this.heartImg.width / 2;
    let heartOffset = 0;
    let heartsUpperOffset = this.canvas.height / 80;

    this.ctx.clearRect(0, 0, this.heartImg.width * 4,this.heartImg.height + heartsUpperOffset);
    for (let i = this.state.player.hp / 100; i > 0; i--) {
        this.ctx.drawImage(this.heartImg, heartsBetweenOffset + heartOffset, heartsUpperOffset, this.heartImg.width, this.heartImg.height);
        heartOffset += this.heartImg.width;
    }

    // игрок
    const playerX = this.canvas.width / 2;
    const playerY = this.canvas.height - offsetByY;
    this.ctx.clearRect(playerX - this.state.player.sprite.width / 2, playerY - this.state.player.sprite.height, this.state.player.sprite.width,this.state.player.sprite.height);
    this.ctx.drawImage(this.state.player.sprite, playerX - this.state.player.sprite.width / 2, playerY - this.state.player.sprite.height);

    // призраки
    const ghostY = this.canvas.height - offsetByY;
    const symbolsOffset = 30;  // расстояние между призраком и символами над его головой

    this.ctx.font = '20pt Comfortaa-Regular';
    this.ctx.fillStyle = 'white';
    let symbolsToShow = '';

    for (let i = 0; i < this.state.ghosts.length; i++) {
        if (this.state.ghosts[i].speed > 0) {
            this.ctx.clearRect(0, this.canvas.height / 2, this.canvas.width / 2 - this.state.player.sprite.width / 2, this.canvas.height / 2);
            this.ctx.drawImage(this.state.ghosts[i].sprite, this.state.ghosts[i].x - this.state.ghosts[i].sprite.width, ghostY - this.state.ghosts[i].sprite.height);
            symbolsToShow = this.state.ghosts[i].symbols.join(' ');
            this.ctx.fillText(symbolsToShow, this.state.ghosts[i].x - this.state.ghosts[i].sprite.width / 2 - this.ctx.measureText(this.state.ghosts[i].symbols).width / 2, ghostY - this.state.ghosts[i].sprite.height - symbolsOffset);
        } else if (this.state.ghosts[i].speed < 0) {
            this.ctx.clearRect(this.canvas.width / 2 + this.state.player.sprite.width / 2, this.canvas.height / 2, this.canvas.width / 2, this.canvas.height / 2);
            this.ctx.drawImage(this.state.ghosts[i].sprite, this.state.ghosts[i].x, ghostY - this.state.ghosts[i].sprite.height);
            symbolsToShow = this.state.ghosts[i].symbols.join(' ');
            this.ctx.fillText(symbolsToShow, this.state.ghosts[i].x + this.state.ghosts[i].sprite.width / 2 - this.ctx.measureText(this.state.ghosts[i].symbols).width / 2, ghostY - this.state.ghosts[i].sprite.height - symbolsOffset);
        }
    }
}

buttonsHandler(e) {
    //  вывод направления, полученного из нажатой клавиши - left, right, down, up
    const dirNameX = this.canvas.width / 2;
    const dirNameY = this.canvas.height / 4;

    // TODO: настроить загрузку шрифта
    this.ctx.font = '30pt Comfortaa-Regular';
    this.ctx.fillStyle = 'white';

    let left = this.ctx.measureText('left');
    let up = this.ctx.measureText('up');
    let right = this.ctx.measureText('right');
    let down = this.ctx.measureText('down');

    // очистка по ширине самого длинного прямоугольника - с надписью 'down'
    this.ctx.clearRect(dirNameX - down.width / 2, dirNameY - 50, 200, 100);

    switch (e.keyCode) {
        case 37:  // если нажата клавиша влево
            this.lastButtonPressed = '←';
            this.ctx.fillText('left', dirNameX - left.width / 2, dirNameY, 200, 100);
            break;
        case 38:   // если нажата клавиша вверх
            this.lastButtonPressed = '↑';
            this.ctx.fillText('up', dirNameX - up.width / 2, dirNameY, 200, 100);
            break;
        case 39:   // если нажата клавиша вправо
            this.lastButtonPressed = '→';
            this.ctx.fillText('right', dirNameX - right.width / 2, dirNameY, 200, 100);
            break;
        case 40:   // если нажата клавиша вниз
            this.lastButtonPressed = '↓';
            this.ctx.fillText('down', dirNameX - down.width / 2, dirNameY, 200, 100);
            break;
        default:
            console.log('unknown');
            break;
    }
}

    buttonsHandler(e) {
        //  вывод направления, полученного из нажатой клавиши - left, right, down, up
        const dirNameX = this.canvas.width / 2;
        const dirNameY = this.canvas.height / 4;

        // TODO: настроить загрузку шрифта
        this.ctx.font = '30pt Comfortaa-Regular';
        this.ctx.fillStyle = 'white';

        let left = this.ctx.measureText('left');
        let up = this.ctx.measureText('up');
        let right = this.ctx.measureText('right');
        let down = this.ctx.measureText('down');

        // очистка по ширине самого длинного прямоугольника - с надписью 'down'
        this.ctx.clearRect(dirNameX - down.width / 2, dirNameY - 50, 200, 100);

        if (this.isSingle) {
            switch (e.keyCode) {
                case 37:  // если нажата клавиша влево
                    this.lastButtonPressed = '←';
                    this.ctx.fillText('left', dirNameX - left.width / 2, dirNameY, 200, 100);
                    break;
                case 38:   // если нажата клавиша вверх
                    this.lastButtonPressed = '↑';
                    this.ctx.fillText('up', dirNameX - up.width / 2, dirNameY, 200, 100);
                    break;
                case 39:   // если нажата клавиша вправо
                    this.lastButtonPressed = '→';
                    this.ctx.fillText('right', dirNameX - right.width / 2, dirNameY, 200, 100);
                    break;
                case 40:   // если нажата клавиша вниз
                    this.lastButtonPressed = '↓';
                    this.ctx.fillText('down', dirNameX - down.width / 2, dirNameY, 200, 100);
                    break;
                default:
                    console.log('unknown');
                    break;
            }
        } else {
            switch (e.keyCode) {
                case 37:  // если нажата клавиша влево
                    this.lastButtonPressed = '←';
                    this.localEventBus.callEvent('sendButton', 'MOVE', 'left');
                    this.ctx.fillText('left', dirNameX - left.width / 2, dirNameY, 200, 100);
                    break;
                case 38:   // если нажата клавиша вверх
                    this.lastButtonPressed = '↑';
                    this.localEventBus.callEvent('sendButton', 'MOVE', 'up');
                    this.ctx.fillText('up', dirNameX - up.width / 2, dirNameY, 200, 100);
                    break;
                case 39:   // если нажата клавиша вправо
                    this.lastButtonPressed = '→';
                    this.localEventBus.callEvent('sendButton', 'MOVE', 'right');
                    this.ctx.fillText('right', dirNameX - right.width / 2, dirNameY, 200, 100);
                    break;
                case 40:   // если нажата клавиша вниз
                    this.lastButtonPressed = '↓';
                    this.localEventBus.callEvent('sendButton', 'MOVE', 'down');
                    this.ctx.fillText('down', dirNameX - down.width / 2, dirNameY, 200, 100);
                    break;
                default:
                    console.log('unknown');
                    break;
            }
        }
    }

    generateDirection() {
        return Math.floor(Math.random() * 2) === 0 ? 'left' : 'right';
    }

    generateSymbolsSequence() {
        const maxSymbolsLength = 2, minSymbolsLength = 6;
        let generatedSymbolsLength = Math.floor(Math.random() * (maxSymbolsLength - minSymbolsLength + 1)) + minSymbolsLength;

        let generatedSymbols = [];
        for (let i = 0; i < generatedSymbolsLength; i++) {
            let generatedSymbolNumber = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
            switch (generatedSymbolNumber) {
                case 1:
                    generatedSymbols.push('←');
                    break;
                case 2:
                    generatedSymbols.push('→');
                    break;
                case 3:
                    generatedSymbols.push('↑');
                    break;
                case 4:
                    generatedSymbols.push('↓');
                    break;
            }
        }
        return generatedSymbols;
    }
}