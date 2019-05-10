import View from '../../libs/views';

import userBlock from '../../components/userBlock/userBlock';
import ModalWindow from '../../components/modalWindow/modalWindow';

import template from './menuView.tmpl.xml';

import './menuGameLogo.scss';
import EventBus from '../../libs/eventBus';
interface authorizationResponse {
    isAuthorized: Boolean,
    statusText: String | string
}

export default class viewMenu extends View {
    isAuth: Boolean;
    constructor(eventBus: EventBus) {
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

    onCheckAuthResponse(authorizationResponse: authorizationResponse) {
        this.isAuth = authorizationResponse.isAuthorized;
        const checkHeader = new userBlock();
        const MW = new ModalWindow();
        const singleButton = document.getElementsByClassName('js-single')[0];
        const multiButton = document.getElementsByClassName('js-multi')[0];

        if (checkHeader.changeButtons(authorizationResponse.statusText)) {
            const signoutButton = document.getElementsByClassName('js-signout')[0];
            signoutButton.addEventListener('click', () => {
                this.isAuth = false;
                this.localEventBus.callEvent('signOut');
            });
        }

        if (this.detectmob()) {
            (singleButton as HTMLElement).onclick = function (event: Event) {
                event.stopImmediatePropagation();
                MW.createModal('mobileBlock');
                return false;
            };
            (multiButton as HTMLElement).onclick = function (event: Event) {
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

    render(root: Element, data = {}) {
        super.render(root, data);
        this.localEventBus.callEvent('checkAuthorization');
        return this;
    }
}
