import View from '../../libs/views.js';
import paginator from '../../components/pagination.js';
import userBlock from '../../components/userBlock.js';
import template from './leaderboardView.tmpl.xml';
import chat from '../../components/chat.js';

export default class leaderboardView extends View {
    constructor({ eventBus = {} }) {
        super(template, eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('loadResponse', this.loadResponse.bind(this));
        this.localEventBus.getEvent('loadPaginatorResponse', this.loadPaginatorResponse.bind(this));
        this.localEventBus.getEvent('checkAuthorizationResponse', this.onCheckAuthResponse.bind(this));
        this.pagination = null;
        this.isClosed = false;
    }

    render(root, data = {}) {
        super.render(root, data);
        this.localEventBus.callEvent('loadPaginator');
        this.localEventBus.callEvent('load', { pageNum: 1 });
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

    loadPaginatorResponse(data) {
        if (data.pagesCount !== undefined && data.linksCount !== undefined) {
            const callbackOnClick = (pageNum) => {
                this.localEventBus.callEvent('load', { pageNum });
            };

            const root = document.getElementsByClassName('js-paginator-buttons')[0];
            this.pagination = new paginator({
                countOfPages: data.pagesCount,
                numOfPositions: data.linksCount,
                callbackOnClick
            });
            this.pagination.render(root);
        } else {
            console.error('There is no pageCount or linksCount, while creating Paginator');
        }
    }

    loadResponse(data) {
        super.render(null, { users: data });

        if (this.pagination !== null) {
            this.pagination.render(document.getElementsByClassName('js-paginator-buttons')[0]);
        }
        this.afterRender();
    }

    afterRender() {
        const backBtn = document.getElementsByClassName('js-back-to-menu')[0];
        backBtn.addEventListener('click', () => { this.isClosed = true; });
        this.localEventBus.callEvent('checkAuthorization');
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
