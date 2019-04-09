export default class gameScene {
    constructor(canvas, ghosts = {}) {
        this.canvas = canvas;
        this.ghosts = ghosts;
        this.state = null;
        this.bindedResizer = this.resizer.bind(this); // TODO(): переехать на шину событий, хезе как

        window.addEventListener('resize', this.bindedResizer);
        this.resizer();

        this.ctx = this.canvas.getContext('2d');
        this.renderScene = this.renderScene.bind(this);
    }

    renderScene(now) {
        this.lastFrameTime = now;
        console.log('got inside gs');
        this.initGhosts(this.ghosts);
        this.initPlayer(this.player);
    }

    initPlayer(player) {
        const ctx = this.ctx;
        const offsetByY = this.canvas.height / 40;

        const heroX = this.canvas.width / 2;
        const heroY = this.canvas.height - offsetByY;

        console.log('initPlayer');

        let heroImg = new Image();
        heroImg.onload = function() {
            ctx.beginPath();
            ctx.drawImage(heroImg, heroX - heroImg.width / 2, heroY - heroImg.height);
        };
        heroImg.src = '../../../img/game/hero.png';

        this.player = player;
    }

    initGhosts(ghosts) {
        const ctx = this.ctx;
        const offsetByY = this.canvas.height / 40;
        const ghostX = this.canvas.width / 16;
        const ghostY = this.canvas.height - offsetByY;

        let ghostLeftImg = new Image();
        ghostLeftImg.onload = function() {
            ghosts.first.img = ghostLeftImg;
            ctx.beginPath();
            ctx.drawImage(ghostLeftImg, ghostX - ghostLeftImg.width / 16, ghostY - ghostLeftImg.height);
        };
        ghostLeftImg.src = '../../../img/game/ghost_l.png';

        let ghostRightImg = new Image();
        ghostRightImg.onload = function() {
            ghosts.second.img = ghostRightImg;
            ctx.beginPath();
            ctx.drawImage(ghostRightImg, (ghostX - ghostRightImg.width / 16) * 15, ghostY - ghostRightImg.height);
        };
        ghostRightImg.src = '../../../img/game/ghost_r.png';
    }

    start() {
        console.log('got inside start');
        this.lastFrameTime = performance.now();
        this.requestFrameId = requestAnimationFrame(this.renderScene);
    }

    resizer() {
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
    }

    stop() {
        if (this.requestFrameId) {
            window.cancelAnimationFrame(this.requestFrameId);
            this.requestFrameId = null;
        }

        this.scene.clear();
    }
}