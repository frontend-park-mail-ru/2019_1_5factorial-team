import View from '../../libs/views';

import userBlock from '../../components/userBlock/userBlock';
import ModalWindow from '../../components/modalWindow/modalWindow';

import template from './menuView.tmpl.xml';

import './menu.scss';

export default class viewMenu extends View {
    constructor(eventBus) {
        super(template, eventBus);
        this.isAuth = false;
        this.isFirst = true;

        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('checkAuthorizationResponse', this.onCheckAuthResponse.bind(this));
        // this.localEventBus.getEvent('close', this.closeAndCancel.bind(this));
    }

    // closeAndCancel() {
    //     console.log('closed tick');
    //     cancelAnimationFrame(this.ticking);
    // }

    onCheckAuthResponse({isAuthorized, statusText}) {
        this.isAuth = isAuthorized;
        this.statusText = statusText;
        const checkHeader = new userBlock();
        const MW = new ModalWindow();
        const multiButton = document.getElementsByClassName('js-multi')[0];

        if (checkHeader.changeButtonsBool(this.isAuth)) {
            const signoutButton = document.getElementsByClassName('js-signout')[0];
            signoutButton.addEventListener('click', () => {
                this.isAuth = false;
                this.localEventBus.callEvent('signOut');
            });
        }

        multiButton.addEventListener('click', (event) => {
            if (!this.isAuth) {
                event.stopImmediatePropagation();
                event.preventDefault();
                MW.createModal('Menu multi error login');
            }
        });

        console.log(this);
    }

    render(root, data = {}) {
        super.render(root, data);

        if (this.isFirst) {
            this.isFirst = false;
        } else {
            setTimeout(() => {this.localEventBus.callEvent('checkAuthorization');}, 100);
        }
    }
}
