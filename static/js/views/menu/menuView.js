import View from '../../libs/views.js';
import userBlock from '../../components/userBlock.js';
// import ModalWindow from '../../components/modalWindow.js';
import template from './menuView.tmpl.xml';

export default class viewMenu extends View {
    constructor({ eventBus = {} }) {
        super(template, eventBus);
        this.isAuth = false;
        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('checkAuthorizationResponse', this.onCheckAuthResponse.bind(this));
    }

    onCheckAuthResponse({isAuthorized = false}) {
        this.isAuth = isAuthorized;
        const checkHeader = new userBlock();
        // const MW = new ModalWindow();
        // const singleButton = document.getElementsByClassName('js-single')[0];
        // const multiButton = document.getElementsByClassName('js-multi')[0];

        if (checkHeader.changeButtons(isAuthorized)) {
            const signoutButton = document.getElementsByClassName('js-signout')[0];
            signoutButton.addEventListener('click', () => {
                this.isAuth = false;
                this.localEventBus.callEvent('signOut');
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
