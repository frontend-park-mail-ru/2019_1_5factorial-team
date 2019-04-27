import Ws from '../libs/websocket.js';
import { NETWORK_ADDRESS_CHAT } from './constants.js';

export default class chat {
    constructor(eventBus) {
        this.websocket = new Ws(eventBus, NETWORK_ADDRESS_CHAT);
    }
    
    sendMessage(type, message) {
        this.websocket.send(type, message);
    }

    close() {
        this.websocket.closeConn();
    }
}