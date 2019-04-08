export default class gameScene {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');


    }

    render() {
        const ctx = this.ctx;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.fillStyle = 'darkgrey';
        ctx.fillRect(200, 200, 50, 50);
    }
}