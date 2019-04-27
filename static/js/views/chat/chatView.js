import View from '../../libs/views.js';
import userBlock from '../../components/userBlock.js';
import template from './chatView.tmpl.xml';
import chat from '../../components/chat.js';

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
            this.chat = new chat(this.localEventBus);
        }
        document.getElementsByClassName('js-chat')[0].remove();



        const messageInput = document.getElementsByClassName('js-message-input')[0];
        messageInput.addEventListener('keydown', (event) => {
            if (event.keyCode !== 13) {
                this.chat.sendMessage('TYPING', messageInput.value);
            } else {
                this.chat.sendMessage('NEW', messageInput.value);
            }
        });

        const backButton = document.getElementsByClassName('btn_back-menu')[0];
        backButton.addEventListener('click', () => {
            this.chat.close();
        });
    }
}
