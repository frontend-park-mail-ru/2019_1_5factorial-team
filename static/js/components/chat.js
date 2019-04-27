import Ws from '../libs/websocket.js';
import { NETWORK_ADDRESS_CHAT } from './constants.js';

export default class chat {
    constructor(eventBus) {
        this.localEventBus = eventBus;
        this.websocket = new Ws(eventBus, NETWORK_ADDRESS_CHAT);
        this.localEventBus.getEvent('printMessage', this.printMessage.bind(this));
    }
    
    sendMessage(type, message) {
        this.websocket.send(type, message);
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

    close() {
        this.websocket.closeConn();
    }
}