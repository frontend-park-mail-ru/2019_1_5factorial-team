import View from '../../libs/views.js';
import userBlock from '../../components/userBlock.js';
import template from './chatView.tmpl.xml';

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
        if (checkHeader.changeButtons(isAuthorized)) {
            const signoutButton = document.getElementsByClassName('js-signout')[0];
            signoutButton.addEventListener('click', () => {
                this.localEventBus.callEvent('signOut');
            });
        }
        document.getElementsByClassName('js-chat')[0].remove();
    }
}
