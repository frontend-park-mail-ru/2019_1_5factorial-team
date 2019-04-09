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

        this.requestFrameId = requestAnimationFrame(this.renderScene);
    }

    initPlayer(player) {
        const ctx = this.ctx;
        const offsetByY = this.canvas.height / 40;

        const heroX = this.canvas.width / 2;
        const heroY = this.canvas.height - offsetByY;

        console.log('initPlayer');

        let heroImg = new Image();
        heroImg.onload = function() {
            ctx.drawImage(heroImg, heroX - heroImg.width / 2, heroY - heroImg.height);
        };
        heroImg.src = '../../../img/game/hero.png';

        this.player = player;
    }

    initGhosts(ghosts) {
        const ctx = this.ctx;
        const offsetByY = this.canvas.height / 40;
        const ghostWidth = this.canvas.width / 10;
        const ghostHeight = this.canvas.width / 10;

        ctx.fillStyle = ghosts.first.color;
        ctx.fillRect((this.canvas.width - ghostWidth) / 16, this.canvas.height - ghostHeight - offsetByY, ghostWidth, ghostHeight);

        ctx.fillStyle = ghosts.second.color;
        ctx.fillRect((this.canvas.width - ghostWidth) * 15 / 16, this.canvas.height - ghostHeight - offsetByY, ghostWidth, ghostHeight);
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