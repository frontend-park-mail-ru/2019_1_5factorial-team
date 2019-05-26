import View from '../../libs/views';

import userBlock from '../../components/userBlock/userBlock';
import ModalWindow from '../../components/modalWindow/modalWindow';
import detectMobile from '../../components/detectMobile';

import template from './menuView.tmpl.xml';

import './menuGameLogo.scss';

export default class viewMenu extends View {
    constructor(eventBus) {
        super(template, eventBus);
        this.isAuth = false;
        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('checkAuthorizationResponse', this.onCheckAuthResponse.bind(this));

        this.localEventBus.callEvent('checkAuthorization');
    }

    onCheckAuthResponse({isAuthorized, statusText}) {
        this.isAuth = isAuthorized;
        const checkHeader = new userBlock();
        const MW = new ModalWindow();
        const singleButton = document.getElementsByClassName('js-single')[0];
        const multiButton = document.getElementsByClassName('js-multi')[0];

        if (checkHeader.changeButtons(statusText)) {
            const signoutButton = document.getElementsByClassName('js-signout')[0];
            signoutButton.addEventListener('click', () => {
                this.isAuth = false;
                this.localEventBus.callEvent('signOut');
            });
        }

        if (detectMobile.detect()) {
            singleButton.onclick = function (event) {
                event.stopImmediatePropagation();
                MW.createModal('mobileBlock');
                return false;
            };
            multiButton.onclick = function (event) {
                event.stopImmediatePropagation();
                MW.createModal('mobileBlock');
                return false;
            };
        }

        // singleButton.addEventListener('click', (event) => {
        //     event.preventDefault();
        //     MW.createModal('Game training');
        // });

        // multiButton.addEventListener('click', (event) => {
        //     if (this.isAuth) {
        //         event.preventDefault();
        //         MW.createModal('Menu multi waiting for player');
        //     } else {
        //         event.preventDefault();
        //         MW.createModal('Menu multi error login');
        //     }
        // });
    }

    render(root, data = {}) {
        super.render(root, data);
        this.localEventBus.callEvent('checkAuthorization');
        return this;
    }
}
