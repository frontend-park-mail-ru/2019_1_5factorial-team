export default class GameScene {
    constructor() {
        this.buttonsPressed = [];

        this.canvas = document.getElementsByClassName('temp_class_canvas')[0];
        this.ctx = this.canvas.getContext('2d');

        this.bindedButtonsHandler = this.buttonsHandler.bind(this);
        window.addEventListener('keydown', this.bindedButtonsHandler);
        // this.buttonsHandler();
        // window.addEventListener('keyup', this.buttonsHandler);

        this.bindedResizer = this.resizer.bind(this); // TODO(): переехать на шину событий, хезе как
        window.addEventListener('resize', this.bindedResizer);
        this.resizer();

        this.requestID = null;

        this.renderLoop();
    }

    buttonsHandler(e) {
        const buttonImgX = this.canvas.width / 2;
        const buttonImgY = 0;

        let buttonImgLeft = new Image();
        buttonImgLeft.src = '../../../img/game/left.png';

        let buttonImgUp = new Image();
        buttonImgUp.src = '../../../img/game/up.png';

        let buttonImgRight = new Image();
        buttonImgRight.src = '../../../img/game/right.png';

        let buttonImgDown = new Image();
        buttonImgDown.src = '../../../img/game/down.png';

        switch (e.keyCode) {
            case 37:  // если нажата клавиша влево
                this.buttonsPressed.push('left');

                // this.ctx.clearRect(buttonImgX, buttonImgY, buttonImgLeft.width, buttonImgLeft.height);

                // buttonImg.onload = function() {
                this.ctx.drawImage(buttonImgLeft, 0, 0, buttonImgLeft.width, buttonImgLeft.height);
                // };
                // buttonImg.src = '../../../img/game/left.png';


                // this.ctx.fillStyle = '#00F';
                // this.ctx.strokeStyle = '#F00';
                // this.ctx.font = '30pt Comfortaa-Regular';
                // this.ctx.fillText('left', this.canvas.width  / 2, this.canvas.height / 2);

                console.log('left');
                break;
            case 38:   // если нажата клавиша вверх
                this.buttonsPressed.push('up');

                // this.ctx.clearRect(buttonImgX, buttonImgY, buttonImgUp.width, buttonImgUp.height);

                // buttonImg.onload = function() {
                this.ctx.drawImage(buttonImgUp, buttonImgX - buttonImgUp.width / 2, buttonImgY);
                // };
                // buttonImg.src = '../../../img/game/up.png';

                console.log('up');
                break;
            case 39:   // если нажата клавиша вправо
                this.buttonsPressed.push('right');

                // this.ctx.clearRect(buttonImgX, buttonImgY, buttonImgRight.width, buttonImgRight.height);

                // buttonImg.onload = function() {
                this.ctx.drawImage(buttonImgRight, buttonImgX - buttonImgRight.width / 2, buttonImgY);
                // };
                // buttonImg.src = '../../../img/game/right.png';

                console.log('right');
                break;
            case 40:   // если нажата клавиша вниз
                this.buttonsPressed.push('down');

                // this.ctx.clearRect(buttonImgX, buttonImgY, buttonImgDown.width, buttonImgDown.height);

                // buttonImg.onload = function() {
                this.ctx.drawImage(buttonImgDown, buttonImgX - buttonImgDown.width / 2, buttonImgY);
                // };
                // buttonImg.src = '../../../img/game/down.png';

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