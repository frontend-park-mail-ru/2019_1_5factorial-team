import View from '../../libs/views.js';
import userBlock from '../../components/userBlock.js';
import template from './aboutView.tmpl.xml';
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
        }
    }

    onShowingChat() {
        let chatButton = document.getElementsByClassName('js-chat-btn')[0];
        let returnChatButton = document.getElementsByClassName('js-hidden-chat-btn')[0];

        chatButton.addEventListener('click',  () => {
            if (!this.chatIsShown) {
                document.getElementsByClassName('js-chat-window')[0].classList.remove('hide');
                chatButton.classList.add('hide');
                this.chat = new chat(this.localEventBus);
                this.chatIsShown = true;
                //<iframe class="chat-window" src="http://localhost:4000/iframe" width="350px" height="370px"></iframe>
            }
        });

        returnChatButton.addEventListener('click',  () => {
            if (!this.chatIsShown) {
                document.getElementsByClassName('js-chat-window')[0].classList.remove('hide');
                returnChatButton.classList.add('hide');
                this.chatIsShown = true;
            }
        });

        const messageInput = document.getElementsByClassName('js-message-input')[0];
        messageInput.addEventListener('keydown', (event) => {
            if (event.keyCode !== 13) {
                this.chat.sendMessage('TYPING', messageInput.value);
            } else {
                this.chat.sendMessage('NEW', messageInput.value);
            }
        });

        const closeChatAndWs = document.getElementsByClassName('js-close-chat')[0];
        closeChatAndWs.addEventListener('click', () => {
            this.chat.close();
            delete this.chat;
        });
    }

    onHidingChat() {
        const closeChatButton = document.getElementsByClassName('js-close-chat')[0];
        const hideChatButton = document.getElementsByClassName('js-hide-chat')[0];

        closeChatButton.addEventListener('click', () => {
            if (this.chatIsShown) {
                document.getElementsByClassName('js-chat-window')[0].classList.add('hide');
                document.getElementsByClassName('js-chat-btn')[0].classList.remove('hide');
                this.chatIsShown = false;
            }
        });

        hideChatButton.addEventListener('click', () => {
            if (this.chatIsShown) {
                document.getElementsByClassName('js-chat-window')[0].classList.add('hide');
                document.getElementsByClassName('js-hidden-chat-btn')[0].classList.remove('hide');
                this.chatIsShown = false;
            }
        });
    }

    printMessage(message) {
        const text = message.text;
        let elemToAppend = document.createElement('div');
        elemToAppend.classList.add('message');
        elemToAppend.classList.add('js-message');
        elemToAppend.textContent = text;
        this.toAppend = document.getElementsByClassName('messages')[0];
        this.toAppend.append(elemToAppend);
    }
}
