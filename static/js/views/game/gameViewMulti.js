import template from './gameView.tmpl.xml';
import View from '../../libs/views';
import userBlock from '../../components/userBlock/userBlock';

import './game.scss';
import ModalWindow from '../../components/modalWindow/modalWindow';

export default class gameViewMulti extends View {
    constructor(eventBus) {
        super(template, eventBus);
        this.state = {
            user: {
                first: {
                    nickname: '',
                },
                second: {
                    nickname: '',
                },
            },
        };
        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('errorOnWs', this.errorOnWs.bind(this));
    }

    errorOnWs({error}) {
        console.log(error);
        const MW = new ModalWindow();
        MW.createModal('Error in multi');
    }

    render(root, data = {}) {
        super.render(root, data);

        const userStates = new userBlock();
        userStates.gameButtonsMulti(this.state);
        const menuButton = document.getElementsByClassName('js-back-to-menu')[0];
        menuButton.addEventListener('click', () => {
            this.localEventBus.callEvent('stopGameManualy');
        });
        this.localEventBus.callEvent('startGame'); 
        return this; 
    }
}