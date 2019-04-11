export default class GameScene {
    constructor() {
        console.log('GameScene called');

        this.canvas = document.getElementsByClassName('temp_class_canvas')[0];
        this.ctx = this.canvas.getContext('2d');

        this.bindedResizer = this.resizer.bind(this); // TODO(): переехать на шину событий, хезе как
        window.addEventListener('resize', this.bindedResizer);
        this.resizer();

        this.requestID = null;

        this.renderLoop();
    }

    resizer() {
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;

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

        console.log('render scene called');

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
    }
}