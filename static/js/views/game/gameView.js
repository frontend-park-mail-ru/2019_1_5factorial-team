import template from './gameView.tmpl.xml';
import View from '../../libs/views.js';
import userBlock from '../../components/userBlock.js';

export default class gameView extends View {
    constructor({eventBus = {}} = {}) {
        super(template, eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
    }

    // TODO(): Norrmal nickname getter
    render(root, data = {}) {
        this.data = data; // загглушка ахахах
        const dataTemp = {
            userName: 'Test'
        };
        super.render(root, dataTemp);
        console.log('data to render', dataTemp);
        // const buttons = document.getElementsByClassName('js-check-user')[0];
        const block = new userBlock();
        // temp solution
        if (block.gameButtons(dataTemp)) {
            this.localEventBus.callEvent('startGame');   
        } else {
            this.localEventBus.callEvent('startGame');
        }
    }
}