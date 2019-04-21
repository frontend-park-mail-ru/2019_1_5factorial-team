import template from './gameView.tmpl.xml';
import View from '../../libs/views.js';
import userBlock from '../../components/userBlock.js';

export default class gameView extends View {
    constructor(eventBus) {
        super(template, eventBus);
        this.localEventBus = eventBus;
        console.log(this.localEventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('onGetUserDataForGameResponse', this.getUserResponse.bind(this));
    }

    getUserResponse(data = {}) {
        if (data) {
            this.render(null, data);
        }
    }

    render(root, data = {}) {
        super.render(root, data);
        
        if (Object.keys(data).length === 0) {
            this.localEventBus.callEvent('getUserDataForGame');
        } else {
            super.render(root, data);

            const block = new userBlock();
            block.gameButtons(data);
            this.localEventBus.callEvent('startGame');  

            const menuButton = document.getElementsByClassName('js-back-to-menu')[0];
            menuButton.addEventListener('click', () => {
                this.localEventBus.callEvent('stopGameManualy');
            });
        }
    }
}