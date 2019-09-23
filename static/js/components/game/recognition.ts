import Jager from '../../libs/jager.js';

export default class Recognizer {
    gestureNames: Array<String>;
    mouseIsDown: Boolean;
    path: Array<Object>;
    gcanvas: any;
    gctx: CanvasRenderingContext2D;
    jager: Jager;
    lastDrawing: Number;
    isDrawingPatch: Boolean;
    constructor() {
        this.jager = new Jager();
        this.isDrawingPatch = true;

        this.lastDrawing = 0;

        this.gestureNames = [
            'none', 'click', 'horizontal', 'vertical',
            '^', 'v', '>', '<',
            'pigtail', 'reverse pigtail', 'lightning', 'circle'
        ];

        this.gcanvas = document.getElementById('gcanvas');
        this.gctx = this.gcanvas.getContext('2d');

        this.mouseIsDown = false;
        this.path = [];

        this.gcanvas.addEventListener('mousedown',  this.gestureStart.bind(this));
        this.gcanvas.addEventListener('mousemove',  this.gestureMove.bind(this));
        this.gcanvas.addEventListener('mouseup',    this.gestureEnd.bind(this));
        this.gcanvas.addEventListener('mouseout',   this.gestureEnd.bind(this));

        this.gcanvas.addEventListener('touchstart',  this.gestureStartTouch.bind(this));
        this.gcanvas.addEventListener('touchmove',   this.gestureMoveTouch.bind(this));
        this.gcanvas.addEventListener('touchcancel', this.gestureEndTouch.bind(this));
        this.gcanvas.addEventListener('touchend',    this.gestureEndTouch.bind(this));
    }

    destroyRecognizer() {
        this.jager = null;
        this.gcanvas.removeEventListener('mousedown',  this.gestureStart.bind(this));
        this.gcanvas.removeEventListener('mousemove',  this.gestureMove.bind(this));
        this.gcanvas.removeEventListener('mouseup',    this.gestureEnd.bind(this));
        this.gcanvas.removeEventListener('mouseout',   this.gestureEnd.bind(this));

        this.gcanvas.removeEventListener('touchstart', this.gestureStart.bind(this));
        this.gcanvas.removeEventListener('touchmove',  this.gestureMove.bind(this));
        this.gcanvas.removeEventListener('touchend',   this.gestureEnd.bind(this));

        this.gcanvas.remove();
    }

    gestureStartTouch(event: Event): Boolean {
        event.preventDefault();
        this.mouseIsDown = true;
        this.path = [this.jager.pointTouch(event)];
        return false;
    }

    gestureStart(event: Event): boolean {
        event.preventDefault();
        this.mouseIsDown = true;
        this.path = [this.jager.point(event)];
        return false;
    }

    gestureMoveTouch(event: Event): Boolean {
        event.preventDefault();
        if (this.mouseIsDown) {
            this.path.push(this.jager.pointTouch(event));
            return false;
        }
        return true;
    }

    gestureMove(event: Event): boolean {
        event.preventDefault();
        if (this.mouseIsDown) {
            this.path.push(this.jager.point(event));
            return false;
        }
        return true;
    }

    gestureEndTouch(event: Event): Boolean {
        event.preventDefault();
        var gesture;
        if (this.mouseIsDown) {
            this.mouseIsDown = false;

            gesture = this.jager.recognise(this.path, 5000, true);
            this.lastDrawing = gesture;
            this.gctx.clearRect(0, 0, this.gcanvas.width, this.gcanvas.height);

            return false;
        }
        return true;
    }

    gestureEnd(event: Event): boolean {
        event.preventDefault();
        var gesture;
        if (this.mouseIsDown) {
            this.mouseIsDown = false;

            gesture = this.jager.recognise(this.path, 5000, true);
            this.lastDrawing = gesture;
            this.gctx.clearRect(0, 0, this.gcanvas.width, this.gcanvas.height);

            return false;
        }
        return true;
    }
}
