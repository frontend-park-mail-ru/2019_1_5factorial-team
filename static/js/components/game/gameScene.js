export default class gameScene {
    constructor(canvas, ghosts = {}) {
        this.canvas = canvas;
        this.ghosts = ghosts;
        this.state = null;
        this.bindedResizer = this.resizer.bind(this);
        window.addEventListener('resize', this.bindedResizer);
        this.resizer();

        console.log(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.renderScene = this.renderScene.bind(this);
    }

    renderScene(now) {
        const ctx = this.ctx;
        // const scene = this.scene;
        this.lastFrameTime = now;
        console.log('got inside gs');
        const offsetByY = this.canvas.height / 40;
        const ghostWidth = this.canvas.width / 10;
        const ghostHeight = this.canvas.width / 10;

        
        ctx.fillStyle = this.ghosts.first.color;
        ctx.fillRect((this.canvas.width - ghostWidth) / 16, this.canvas.height - ghostHeight - offsetByY, ghostWidth, ghostHeight);

        ctx.fillStyle = this.ghosts.second.color;
        ctx.fillRect((this.canvas.width - ghostWidth) * 15 / 16, this.canvas.height - ghostHeight - offsetByY, ghostWidth, ghostHeight);
        // scene.render();

        // ghostsInside.forEach(ghost => scene.remove(ghost));
        this.requestFrameId = requestAnimationFrame(this.renderScene);
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