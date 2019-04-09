export default class gameScene {
    constructor(canvas, ghosts = {}) {
        this.canvas = canvas;
        this.ghosts = ghosts;
        this.bindedResizer = this.resizer.bind(this);
        window.addEventListener('resize', this.bindedResizer);
        this.resizer();

        console.log(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.renderScene = this.renderScene.bind(this);
    }

    renderScene(now) {
        const ctx = this.ctx;
        const scene = this.scene;
        // const delay = now - this.lastFrameTime;
        this.lastFrameTime = now;
        console.log('got inside');
        // debugger;
        const ghostsInside = this.state.ghostsInside.map(() => {
            const offsetByY = this.canvas.height / 40;
            const ghostWidth = this.canvas.width / 10;
            const ghostHeight = this.canvas.width / 10;

            
            ctx.fillStyle = this.ghosts.first.color;
            ctx.fillRect((this.canvas.width - ghostWidth) / 16, this.canvas.height - ghostHeight - offsetByY, ghostWidth, ghostHeight);

            ctx.fillStyle = this.ghosts.second.color;
            ctx.fillRect((this.canvas.width - ghostWidth) * 15 / 16, this.canvas.height - ghostHeight - offsetByY, ghostWidth, ghostHeight);
        });
        scene.render();

        ghostsInside.forEach(ghost => scene.remove(ghost));
        this.requestFrameId = requestAnimationFrame(this.renderScene);
    }

    start() {
        console.log('got inside start');
        this.lastFrameTime = performance.now();
        this.requestFrameId = requestAnimationFrame(this.renderScene);
    }

    // render() {
    //     console.log('rendering gameScene');
    //     const ctx = this.ctx;
    //     ctx.fillStyle = 'transparent';
    //     ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    //     const offsetByY = this.canvas.height / 40;

    //     const heroWidth = this.canvas.width / 10;
    //     const heroHeight = this.canvas.width / 10;

    //     ctx.fillStyle = 'darkgrey';
    //     ctx.fillRect((this.canvas.width - heroWidth) / 2, this.canvas.height - heroHeight - offsetByY,
    //         heroWidth, heroHeight);

    //     const ghostWidth = this.canvas.width / 10;
    //     const ghostHeight = this.canvas.width / 10;

    //     ctx.fillStyle = this.ghosts.first.color;
    //     ctx.fillRect((this.canvas.width - ghostWidth) / 16, this.canvas.height - ghostHeight - offsetByY,
    //         ghostWidth, ghostHeight);

    //     ctx.fillStyle = this.ghosts.second.color;
    //     ctx.fillRect((this.canvas.width - ghostWidth) * 15 / 16, this.canvas.height - ghostHeight - offsetByY,
    //         ghostWidth, ghostHeight);
    //     this.ghosts = requestAnimationFrame(this.renderScene)
    // }

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