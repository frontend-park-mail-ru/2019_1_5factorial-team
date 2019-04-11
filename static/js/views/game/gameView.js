import template from './gameView.tmpl.xml';
import View from '../../libs/views.js';
import GameScene from '../../components/game/gameScene';


export default class gameView extends View {
    constructor({eventBus = {}} = {}) {
        super(template, eventBus);

        this.render(document.getElementsByClassName('body-cnt')[0]);

        // this.mode = mode;
        this.canvas = document.getElementsByClassName('temp_class_canvas')[0];
        console.log('canvas: ' + this.canvas);

        this.scene = new GameScene(this.canvas);


        this.startRenderLoop();
    }

    startRenderLoop() {
        this.requestID = requestAnimationFrame(this.renderLoop);
    }

    renderLoop() {
        this.scene.renderScene();
        this.requestID = requestAnimationFrame(this.renderLoop);
    }
}