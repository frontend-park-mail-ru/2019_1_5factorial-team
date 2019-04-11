import template from './gameView.tmpl.xml';
import View from '../../libs/views.js';
// import GameScene from '../../components/game/gameScene';


export default class gameView extends View {
    constructor({eventBus = {}} = {}) {
        super(template, eventBus);

        this.render(document.getElementsByClassName('body-cnt')[0]);
        // this.localEventBus.getEvent('startGame', this.onStart.bind(this));
    }

    render(root, data = {}) {
        super.render(root, data);
        this.localEventBus.callEvent('startGame');
    }
}