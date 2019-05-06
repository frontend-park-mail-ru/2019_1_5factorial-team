import View from '../../libs/views.js';

import userBlock from '../../components/userBlock/userBlock.js';
import ModalWindow from '../../components/modalWindow/modalWindow.js';

import template from './menuView.tmpl.xml';

import './menuGameLogo.scss';

export default class viewMenu extends View {
    constructor({ eventBus = {} }) {
        super(template, eventBus);
        this.isAuth = false;
        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('checkAuthorizationResponse', this.onCheckAuthResponse.bind(this));
    }

    detectmob() { 
        if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
        ) {
            return true;
        } else {
            return false;
        }
    }

    onCheckAuthResponse({isAuthorized = false, statusText}) {
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

        if (this.detectmob()) {
            window.alert('testing');
            singleButton.addEventListener('click', (event) => {
                window.alert('testing inside');
                event.preventDefault();
                MW.createModal('mobileBlock');
            });
            multiButton.addEventListener('click', (event) => {
                window.alert('testing for multi');
                event.preventDefault();
                MW.createModal('mobileBlock');
            });
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
    }
}
