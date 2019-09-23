import View from '../../libs/views';

import userBlock from '../../components/userBlock/userBlock';
import ModalWindow from '../../components/modalWindow/modalWindow';

import template from './menuView.tmpl.xml';

import './menuGameLogo.scss';

export default class viewMenu extends View {
    constructor(eventBus, logger) {
        super(template, eventBus);
        this.logger = logger;
        this.isAuth = false;

        this.render(document.getElementsByClassName('body-cnt')[0]);
        
        this.localEventBus.getEvent('checkAuthorizationResponse', this.onCheckAuthResponse.bind(this));
    }

    onCheckAuthResponse({isAuthorized, statusText}) {
        this.isAuth = isAuthorized;
        this.statusText = statusText;
        const checkHeader = new userBlock();
        const MW = new ModalWindow();
        const singleButton = document.getElementsByClassName('js-single')[0];

        if (checkHeader.changeButtonsBool(this.isAuth)) {
            const signoutButton = document.getElementsByClassName('js-signout')[0];
            signoutButton.addEventListener('click', () => {
                this.isAuth = false;
                this.localEventBus.callEvent('signOut');
            });
        }

        singleButton.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            MW.createModal('Game training');

            if (document.getElementsByClassName('content content_modal')) {
                document.getElementsByClassName('js-start-training').addEventListener('click', () => {
                    console.log(event);
                });
            }
        });
    }

    render(root, data = {}) {
        this.localEventBus.callEvent('checkAuthorization');
        super.render(root, data);
    }
}
