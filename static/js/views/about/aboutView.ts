import View from '../../libs/views';
import userBlock from '../../components/userBlock/userBlock';
import * as template from './aboutView.tmpl.ts';
import EventBus from '../../libs/eventBus';

export default class aboutView extends View {
    constructor(eventBus: EventBus) {
        super(template, eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('checkAuthorizationResponse', this.onCheckAuthResponse.bind(this));
    }

    render(root: Element, data?: { users?: any; }) {
        super.render(root, data);
        this.localEventBus.callEvent('checkAuthorization');
        return this;
    }

    onCheckAuthResponse({isAuthorized = false} = {}) {
        const checkHeader = new userBlock();
        let statusText: string | String;
        isAuthorized ? statusText = 'OK' : statusText = 'anauth';
        if (checkHeader.changeButtons(statusText)) {
            const signoutButton = document.getElementsByClassName('js-signout')[0];
            signoutButton.addEventListener('click', () => {
                this.localEventBus.callEvent('signOut');
            });
        }
    }

}
