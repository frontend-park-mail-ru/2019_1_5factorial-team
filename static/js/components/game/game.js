const GHOST_SPEED = 100;
const GHOST_DAMAGE = 1;


export default class Game {
    constructor() {
        this.canvas = document.getElementsByClassName('temp_class_canvas')[0];
        this.ctx = this.canvas.getContext('2d');

        // последняя нажатая клавиша
        this.lastButtonPressed = '';

        // слушаем нажатия клавиш с клавиатуры
        this.bindedButtonsHandler = this.buttonsHandler.bind(this);
        window.addEventListener('keydown', this.bindedButtonsHandler);

        // слушаем изменение размеров экрана
        this.bindedResizer = this.resizer.bind(this); // TODO(): переехать на шину событий, хезе как
        window.addEventListener('resize', this.bindedResizer);
        this.resizer();

        this.requestID = null;

        // достаем спрайты, TODO: придумать, как работать со спрайтами
        let playerImg = document.getElementById('player-sprite');
        this.ghostLeftImg = document.getElementById('ghost-left-sprite');
        // let ghostRightImg = document.getElementById('ghost-right-sprite');
        // let heartImg = document.getElementById('heart-sprite');

        // состояние игры
        this.state = {
            player: {
                sprite: playerImg,
                x: (this.canvas.width -  playerImg.width) / 2,
                hp: 300
            },
            ghosts: [],

            // TODO: на бэке этих полей нет - решить, нужны ли
            score: 0,
            gameTime: 0,
            isGameOver: false
        };

        // const leftGhost = {
        //     x: this.ghostLeftImg.width / 2,
        //     speed: GHOST_SPEED,
        //     damage: 1,
        //     sprite: this.ghostLeftImg,
        //     symbols: ['L', 'R', 'D']
        // };
        // this.state.ghosts.push(leftGhost);

        this.lastTime = Date.now();

        this.gameLoop();
    }

    resizer() {
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
    }

    destroy() {
        if (this.requestID) {
            cancelAnimationFrame(this.requestID);
        }
        window.removeEventListener('resize', this.bindedResizer);
        window.removeEventListener('keydown', this.bindedButtonsHandler);
    }

    gameLoop() {
        let now = Date.now();
        let dt = (now - this.lastTime) / 1000.0;

        this.update(dt);
        this.render();

        if (this.state.isGameOver === true) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.destroy();
            console.log('game over');
            return;
        }

        this.lastTime = now;
        this.requestID = requestAnimationFrame(this.gameLoop.bind(this));
    }

    update(dt) {
        this.state.gameTime += dt;

        // один призрак - все работает супер-пупер (закомментить и раскомментить код ниже для теста)
        if (this.state.gameTime === 0) {
            console.log('game time: ' + this.state.gameTime);

            this.state.ghosts.push({
                x: this.ghostLeftImg.width / 2,
                speed: GHOST_SPEED,
                damage: GHOST_DAMAGE,
                sprite: this.ghostLeftImg,
                symbols: ['L', 'R', 'D']
            });
        }

        // раскомментить тут и еще в render() в цикле эту строку: this.ctx.clearRect(0, 0, this.canvas.width / 2 - playerImg.width / 2, this.canvas.height);
        // в условии некое уравнение, по которому генерятся призраки - сперла из интернетов

        // if (Math.random() < 1 - Math.pow(.993, this.state.gameTime)) {
        //     console.log('game time: ' + this.state.gameTime);
        //
        //     this.state.ghosts.push({
        //         x: this.ghostLeftImg.width / 2,
        //         speed: GHOST_SPEED,
        //         damage: GHOST_DAMAGE,
        //         sprite: this.ghostLeftImg,
        //         symbols: ['L', 'R', 'D']
        //     });
        // }

        //  убиваем призраков
        for (let i = 0; i < this.state.ghosts.length; i++) {
            // сносим символ
            if (this.lastButtonPressed === this.state.ghosts[i].symbols[0]) {
                this.state.ghosts[i].symbols = this.state.ghosts[i].symbols.slice(1, this.state.ghosts[i].symbols.length + 1);
            }

            // убили
            if (this.state.ghosts[i].symbols.length === 0) {
                this.state.ghosts.splice(i, 1);
                console.log('ghosts: ' + this.state.ghosts.length);
                this.ctx.clearRect(0, 0, this.canvas.width / 2 - this.state.player.sprite.width / 2, this.canvas.height);
            }

            if (this.state.ghosts.length !== 0) {
                if (this.state.ghosts[i].x < this.state.player.x) {
                    this.state.ghosts[i].x += GHOST_SPEED * dt;
                } else {
                    if (this.state.player.hp === 300) {
                        console.log('player hp: 3 / 3');
                    }
                    if (this.state.player.hp === 200) {
                        console.log('player hp: 2 / 3');
                    }
                    if (this.state.player.hp === 100) {
                        console.log('player hp: 1 / 3');
                    }
                    this.state.player.hp -= this.state.ghosts[i].damage;
                }
            } else {
                break;
            }

            if (this.state.player.hp === 0) {
                this.state.isGameOver = true;
                return;
            }
        }
    }

    render() {
        const offsetByY = this.canvas.height / 40;  // смещение по Y - расстояние от нижнего края экрана

        // жизни-сердечки, TODO: сделать, чтоб заработало
        // let livesOffset = 0;
        //
        // for (let i = this.state.player.hp / 100; i > 0; i--) {
        //     this.ctx.drawImage(heartImg, livesOffset, 0, heartImg.width, heartImg.height);
        //     livesOffset += heartImg.width;
        //     console.log('lives offset: ' + livesOffset);
        // }

        // игрок
        const playerImg = this.state.player.sprite;
        const playerX = this.canvas.width / 2;
        const playerY = this.canvas.height - offsetByY;
        this.ctx.drawImage(playerImg, playerX - playerImg.width / 2, playerY - playerImg.height);

        // призраки
        const ghostY = this.canvas.height - offsetByY;
        const symbolsOffset = 30;  // расстояние между призраком и символами над его головой

        let symbolsToShow = '';

        for (let i = 0; i < this.state.ghosts.length; i++) {
            this.ctx.clearRect(0, 0, this.canvas.width / 2 - playerImg.width / 2, this.canvas.height);  // закомментить тут
            this.ctx.drawImage(this.state.ghosts[i].sprite, this.state.ghosts[i].x - this.state.ghosts[i].sprite.width * 3 / 2, ghostY - this.state.ghosts[i].sprite.height);
            this.ctx.font = '20pt Comfortaa-Regular';
            this.ctx.fillStyle = 'white';
            symbolsToShow = this.state.ghosts[i].symbols.join();
            this.ctx.fillText(symbolsToShow, this.state.ghosts[i].x - this.state.ghosts[i].sprite.width - this.ctx.measureText(this.state.ghosts[i].symbols).width / 2, ghostY - this.state.ghosts[i].sprite.height - symbolsOffset);
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
                this.lastButtonPressed = 'L';
                this.ctx.fillText('left', dirNameX - left.width / 2, dirNameY, 200, 100);
                console.log('left');
                break;
            case 38:   // если нажата клавиша вверх
                this.lastButtonPressed = 'U';
                this.ctx.fillText('up', dirNameX - up.width / 2, dirNameY, 200, 100);
                console.log('up');
                break;
            case 39:   // если нажата клавиша вправо
                this.lastButtonPressed = 'R';
                this.ctx.fillText('right', dirNameX - right.width / 2, dirNameY, 200, 100);
                console.log('right');
                break;
            case 40:   // если нажата клавиша вниз
                this.lastButtonPressed = 'D';
                this.ctx.fillText('down', dirNameX - down.width / 2, dirNameY, 200, 100);
                console.log('down');
                break;
            default:
                console.log('unknown');
                break;
        }
    }
}