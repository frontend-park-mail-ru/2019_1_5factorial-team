import View from '../../libs/views.js';
import userBlock from '../../components/userBlock/userBlock.js';
import template from './aboutView.tmpl.xml';

export default class aboutView extends View {
    constructor({ eventBus = {} } = {}) {
        super(template, eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('checkAuthorizationResponse', this.onCheckAuthResponse.bind(this));
    }

    render(root, data = {}) {
        super.render(root, data);
        this.localEventBus.callEvent('checkAuthorization');
    }

    onCheckAuthResponse({isAuthorized = false} = {}) {
        const checkHeader = new userBlock();
        let statusText;
        isAuthorized ? statusText = 'OK' : statusText = 'anauth';
        if (checkHeader.changeButtons(statusText)) {
            const signoutButton = document.getElementsByClassName('js-signout')[0];
            signoutButton.addEventListener('click', () => {
                this.localEventBus.callEvent('signOut');
            });
        }
    }

}
