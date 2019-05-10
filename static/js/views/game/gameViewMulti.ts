import template from './gameView.tmpl.xml';
import View from '../../libs/views';
import userBlock from '../../components/userBlock/userBlock';

import './game.scss';
import EventBus from '../../libs/eventBus';

export default class gameViewMulti extends View {
    state: { user: { first?: { nickname?: String; }; second?: { nickname?: String; }; } | { first: { nickname: string; }; second: { nickname: string; }; }; }
    constructor(eventBus: EventBus) {
        super(template, eventBus);
        this.state = {
            user: {
                first: {
                    nickname: 'Pasha',
                },
                second: {
                    nickname: 'Kirill',
                },
            },
        };
        this.render(document.getElementsByClassName('body-cnt')[0]);
    }

    render(root: Element, data = {}) {
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