const GHOST_SPEED = 100;

export default class GameScene {
    constructor() {
        this.canvas = document.getElementsByClassName('temp_class_canvas')[0];
        this.ctx = this.canvas.getContext('2d');

        this.lastButtonPressed = '';

        this.bindedButtonsHandler = this.buttonsHandler.bind(this);
        window.addEventListener('keydown', this.bindedButtonsHandler);

        this.bindedResizer = this.resizer.bind(this); // TODO(): переехать на шину событий, хезе как
        window.addEventListener('resize', this.bindedResizer);
        this.resizer();

        this.requestID = null;

        let heroImg = document.getElementById('hero-sprite');
        this.state = {
            hero: {
                x: (this.canvas.width -  heroImg.width) / 2,
                hp: 3
            },
            sprite: heroImg,
            ghosts: [],
            score: 0,
            gameTime: 0,
            isGameOver: false
        };

        let ghostLeftImg = new Image();
        ghostLeftImg.src = '../../../img/game/ghost_l.png';

        // let ghostRightImg = new Image();
        // ghostRightImg.src = '../../../img/game/ghost_r.png';

        const leftGhost = {
            x: ghostLeftImg.width / 2,
            hp: 3,
            sprite: ghostLeftImg,
            symbols: 'LRD'
        };
        this.state.ghosts.push(leftGhost);

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
    }

    gameLoop() {
        let now = Date.now();
        let dt = (now - this.lastTime) / 1000.0;

        this.update(dt);
        this.renderScene();

        this.lastTime = now;
        this.requestID = requestAnimationFrame(this.gameLoop.bind(this));
    }

    update(dt) {
        this.state.gameTime += dt;

        for (let i = 0; i < this.state.ghosts.length; i++) {
            if (this.lastButtonPressed  === this.state.ghosts[i].symbols[0]) {
                this.state.ghosts[i].hp--;
                this.state.ghosts[i].symbols = this.state.ghosts[i].symbols.substr(1, this.state.ghosts[i].symbols.length + 1);
            }

            if (this.state.ghosts[i].x + GHOST_SPEED * dt < this.state.hero.x) {
                this.state.ghosts[i].x += GHOST_SPEED * dt;
            }
        }
    }

    renderScene() {
        const ctx = this.ctx;

        // смещение по Y - расстояние от нижнего края экрана
        const offsetByY = this.canvas.height / 40;

        // hero
        let heroImg = document.getElementById('hero-sprite');

        const heroX = this.canvas.width / 2;
        const heroY = this.canvas.height - offsetByY;

        ctx.drawImage(heroImg, heroX - heroImg.width / 2, heroY - heroImg.height);

        // ghosts
        const ghostY = this.canvas.height - offsetByY;

        const symbolsOffset = 30;

        for (let i = 0; i < this.state.ghosts.length; i++) {
            if (this.state.ghosts[i].hp === 0) {
                this.state.ghosts.pop();
                ctx.clearRect(0, 0, this.canvas.width / 2 - heroImg.width / 2, this.canvas.height);
                return;
            }

            ctx.clearRect(0, 0, this.canvas.width / 2 - heroImg.width / 2, this.canvas.height);
            ctx.drawImage(this.state.ghosts[i].sprite, this.state.ghosts[i].x - this.state.ghosts[i].sprite.width * 3 / 2, ghostY - this.state.ghosts[i].sprite.height);
            this.ctx.font = '20pt Comfortaa-Regular';
            this.ctx.fillStyle = 'white';
            ctx.fillText(this.state.ghosts[i].symbols, this.state.ghosts[i].x - this.state.ghosts[i].sprite.width - this.ctx.measureText(this.state.ghosts[i].symbols).width / 2, ghostY - this.state.ghosts[i].sprite.height - symbolsOffset);
        }
    }

    buttonsHandler(e) {
        const dirNameX = this.canvas.width / 2;
        const dirNameY = this.canvas.height / 4;

        /*
         * TODO: настроить загрузку шрифта
         * пока что при первом нажатии вывод надписи проходит в дефолтном шрифте :(
        */

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