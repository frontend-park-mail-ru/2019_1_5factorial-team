import Jager from '../../libs/jager.js';

export default class Recognizer {

    constructor() {
        this.jager = new Jager();

        this.gestureNames = [
            'none', 'click', 'horizontal', 'vertical',
            '^', 'v', '>', '<',
            'pigtail', 'reverse pigtail', 'lightning', 'circle'
        ];

        this.gcanvas = document.getElementById('gcanvas');
        this.gctx = this.gcanvas.getContext('2d');

        this.mouseIsDown = false;
        this.path = [];

        window.addEventListener('orientationchange', this.onResize.bind(this));
        window.addEventListener('resize', this.onResize.bind(this));
        document.addEventListener('visibilitychange', () => { 
            if (!document.hidden) {
                this.onResize();
            }
        }, false);

        this.gcanvas.addEventListener('mousedown',  this.gestureStart.bind(this));
        this.gcanvas.addEventListener('mousemove',  this.gestureMove.bind(this));
        this.gcanvas.addEventListener('mouseup',    this.gestureEnd.bind(this));
        this.gcanvas.addEventListener('mouseout',   this.gestureEnd.bind(this));

        this.gcanvas.addEventListener('touchstart', this.gestureStart.bind(this));
        this.gcanvas.addEventListener('touchmove',  this.gestureMove.bind(this));
        this.gcanvas.addEventListener('touchend',   this.gestureEnd.bind(this));

        this.onResize();
        this.tick();
    }

    onResize() {
        this.gcanvas.width  = this.gcanvas.scrollWidth;
        this.gcanvas.height = this.gcanvas.scrollHeight;
    }

    gestureStart(evt) {
        this.mouseIsDown = true;
        this.path = [this.jager.point(evt)];
        evt.preventDefault();
        return false;
    }

    gestureMove(evt) {
        if (this.mouseIsDown) {
            this.path.push(this.jager.point(evt));
            evt.preventDefault();
            return false;
        }
        return true;
    }

    gestureEnd(evt) {
        var gesture;
        if (this.mouseIsDown) {
            this.mouseIsDown = false;

            gesture = this.jager.recognise(this.path, 5000, true);
            console.log(this.gestureNames[gesture]);
            gctx.clearRect(0, 0, gcanvas.scrollWidth, gcanvas.scrollHeight);

            return false;
        }
        return true;
    }

    tick() {
        if (this.mouseIsDown) {
            this.gctx.clearRect(0, 0, this.gcanvas.scrollWidth, this.gcanvas.scrollHeight);
            this.jager.drawPatch(this.path, this.gctx, this.jager.recognise(this.path));
        }

        requestAnimationFrame(this.tick);
    }
}