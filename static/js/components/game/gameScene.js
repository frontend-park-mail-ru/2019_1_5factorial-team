export default class gameScene {
    constructor(canvas) {
        this.canvas = canvas;

        this.bindedResizer = this.resizer.bind(this);
        window.addEventListener('resize', this.bindedResizer);
        this.resizer();

        console.log(this.canvas);
        this.ctx = this.canvas.getContext('2d');
    }

    render() {
        const ctx = this.ctx;
        ctx.fillStyle = 'transparent';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const offsetByY = this.canvas.height / 40;

        const heroWidth = this.canvas.width / 10;
        const heroHeight = this.canvas.width / 10;

        ctx.fillStyle = 'darkgrey';
        ctx.fillRect((this.canvas.width - heroWidth) / 2, this.canvas.height - heroHeight - offsetByY,
            heroWidth, heroHeight);

        const ghostWidth = this.canvas.width / 10;
        const ghostHeight = this.canvas.width / 10;

        ctx.fillStyle = 'yellow';
        ctx.fillRect((this.canvas.width - ghostWidth) / 16, this.canvas.height - ghostHeight - offsetByY,
            ghostWidth, ghostHeight);

        ctx.fillStyle = 'blue';
        ctx.fillRect((this.canvas.width - ghostWidth) * 15 / 16, this.canvas.height - ghostHeight - offsetByY,
            ghostWidth, ghostHeight);

    }

    resizer() {
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
    }
}