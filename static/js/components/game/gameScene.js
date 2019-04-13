export default class GameScene {
    constructor() {
        this.buttonsPressed = [];

        this.canvas = document.getElementsByClassName('temp_class_canvas')[0];
        this.ctx = this.canvas.getContext('2d');

        this.bindedButtonsHandler = this.buttonsHandler.bind(this);
        window.addEventListener('keydown', this.bindedButtonsHandler);

        this.bindedResizer = this.resizer.bind(this); // TODO(): переехать на шину событий, хезе как
        window.addEventListener('resize', this.bindedResizer);
        this.resizer();

        this.requestID = null;

        this.renderLoop();
    }

    buttonsHandler(e) {
        const dirNameX = this.canvas.width / 2;
        const dirNameY = this.canvas.height / 4;

        this.ctx.font = '30pt Comfortaa-Regular';
        /*
         * TODO: настроить загрузку шрифта
         * пока что при первом нажатии вывод надписи проходит в дефолтном шрифте :(
        */

        this.ctx.fillStyle = 'white';

        let left = this.ctx.measureText('left');
        let up = this.ctx.measureText('up');
        let right = this.ctx.measureText('right');
        let down = this.ctx.measureText('down');

        // очистка по ширине самого длинного прямоугольника - с
        this.ctx.clearRect(dirNameX - down.width / 2, dirNameY - 50, 200, 100);

        switch (e.keyCode) {
            case 37:  // если нажата клавиша влево
                this.buttonsPressed.push('left');
                
                this.ctx.fillText('left', dirNameX - left.width / 2, dirNameY, 200, 100);

                console.log('left');
                break;
            case 38:   // если нажата клавиша вверх
                this.buttonsPressed.push('up');

                this.ctx.fillText('up', dirNameX - up.width / 2, dirNameY, 200, 100);

                console.log('up');
                break;
            case 39:   // если нажата клавиша вправо
                this.buttonsPressed.push('right');

                this.ctx.fillText('right', dirNameX - right.width / 2, dirNameY, 200, 100);

                console.log('right');
                break;
            case 40:   // если нажата клавиша вниз
                this.buttonsPressed.push('down');

                this.ctx.fillText('down', dirNameX - down.width / 2, dirNameY, 200, 100);

                console.log('down');
                break;
            default:
                console.log('unknown');
                break;
        }
    }

    resizer() {
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // console.log('resized H: ' + this.canvas.height);
        // console.log('resized W: ' + this.canvas.width);
    }

    destroy() {
        if (this.requestID) {
            cancelAnimationFrame(this.requestID);
        }
        window.removeEventListener('resize', this.bindedResizer);
    }

    renderLoop() {
        this.renderScene();
        this.requestID = requestAnimationFrame(this.renderLoop.bind(this));
    }

    renderScene() {
        const ctx = this.ctx;

        // console.log('render scene called');

        // смещение по Y - расстояние от нижнего края экрана
        const offsetByY = this.canvas.height / 40;

        // hero
        const heroX = this.canvas.width / 2;
        const heroY = this.canvas.height - offsetByY;

        let heroImg = new Image();
        heroImg.onload = function() {
            ctx.drawImage(heroImg, heroX - heroImg.width / 2, heroY - heroImg.height);
        };
        heroImg.src = '../../../img/game/hero.png';

        // ghosts
        const ghostX = this.canvas.width / 16;
        const ghostY = this.canvas.height - offsetByY;

        let ghostLeftImg = new Image();
        ghostLeftImg.onload = function() {
            ctx.drawImage(ghostLeftImg, ghostX - ghostLeftImg.width / 16, ghostY - ghostLeftImg.height);
            // console.log('ghost_l img drawn: ' + '(' + ghostLeftImg.x + ', ' + ghostLeftImg.y + '), W: ' +  ghostLeftImg.width + ' H: ' + ghostLeftImg.height);
        };
        ghostLeftImg.src = '../../../img/game/ghost_l.png';

        let ghostRightImg = new Image();
        ghostRightImg.onload = function() {
            ctx.drawImage(ghostRightImg, (ghostX - ghostRightImg.width / 16) * 15, ghostY - ghostRightImg.height);
            // console.log('ghost_r img drawn: ' + '(' + ghostRightImg.x + ', ' + ghostRightImg.y + '), W: ' +  ghostRightImg.width + ' H: ' + ghostRightImg.height);
        };
        ghostRightImg.src = '../../../img/game/ghost_r.png';

        // this.buttonsPressed.forEach(function(item) {
        //     console.log('item drown: ' + item);

        // });
    }
}