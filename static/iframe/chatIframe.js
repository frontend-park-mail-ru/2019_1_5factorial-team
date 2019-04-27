
import chat from '../js/components/chat.js';
import EventBus from '../js/libs/eventBus.js';
import { EVENT_LIST_CHAT } from '../js/components/constants.js';

export default class hatIframe {
    constructor(event) {
        this.localEventBus = new EventBus(EVENT_LIST_CHAT.concat(event));
        this.chat = new chat(this.localEventBus);

        this.localEventBus.getEvent('sendMessage', this.sendMessage.bind(this));
        this.localEventBus.getEvent('typingMessage', this.typingMessage.bind(this));
        this.localEventBus.getEvent('printMessageChat', this.printMessage.bind(this));

        const messageInput = document.getElementsByClassName('js-message-input')[0];
        messageInput.addEventListener('keydown', (event) => {
            if (event.keyCode !== 13) {
                this.localEventBus.callEvent('typingMessage', messageInput.value);
            } else {
                this.localEventBus.callEvent('sendMessage', messageInput.value);
            }
        });

        const closeChatAndWs = document.getElementsByClassName('js-close-chat')[0];
        closeChatAndWs.addEventListener('click', () => {
            this.chat.close();
            delete this.chat;
        });
    }

    sendMessage(text) {
        this.chat.sendMessage('NEW', text);
    }

    typingMessage(text) {
        this.chat.sendMessage('TYPING', text);
    }

    printMessage(message) {
        debugger;
        const iframe = document.getElementsByClassName('js-iframe')[0];
        const text = message.text;
        let elemToAppend = document.createElement('div');
        elemToAppend.classList.add('message');
        elemToAppend.classList.add('js-message');
        elemToAppend.textContent = text;
        this.toAppend = iframe.getElementsByClassName('messages')[0];
        this.toAppend.append(elemToAppend);
    }
}