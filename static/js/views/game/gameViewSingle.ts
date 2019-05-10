import template from './gameView.tmpl.xml';
import View from '../../libs/views';
import userBlock from '../../components/userBlock/userBlock';

import './game.scss';
import EventBus from '../../libs/eventBus';

export default class gameView extends View {
    isChecked: Boolean;
    isStart: Boolean;
    constructor(eventBus: EventBus) {
        super(template, eventBus);
        this.localEventBus = eventBus;

        this.isChecked = false;
        this.isStart = false;

        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('onGetUserDataForGameResponse', this.getUserResponse.bind(this));
    }

    getUserResponse(data = {}) {
        
        const block = new userBlock();
        block.gameButtons(data);
        const menuButton = document.getElementsByClassName('js-back-to-menu')[0];
        menuButton.addEventListener('click', () => {
            this.localEventBus.callEvent('stopGameManualy');
        });
        this.localEventBus.callEvent('startGame');  
    }

    render(root: Element, data = {}) {
        super.render(root, data);
        this.localEventBus.callEvent('getUserDataForGame');
        return this;
    }
}