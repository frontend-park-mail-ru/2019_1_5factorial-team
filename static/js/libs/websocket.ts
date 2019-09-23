import EventBus from "./eventBus";
import Logger from "./logger";

import {NETWORK_ADRESS_WS_GAME} from '../components/constants';

export default class Ws {
    localEventBus: EventBus;
    logger: Logger;

    webs: any;
    static __instance: Ws;
    constructor(eventBus: EventBus, logger: Logger) {
        this.localEventBus = eventBus;
        this.logger = logger;

        this.localEventBus.getEvent('sendButton', this.send.bind(this));
        if (Ws.__instance) {
            return Ws.__instance;
        }

        const address = NETWORK_ADRESS_WS_GAME;
        this.webs = new WebSocket(address);

        this.webs.onopen = () => {

            this.webs.onclose = () => {};

            this.webs.onmessage = this.handleMessage.bind(this);
        };

        Ws.__instance = this;
    }

    closeConn() {
        Ws.__instance = null;
        this.webs.close();
    }

    handleMessage(event: { data: any; }) {
        if (event === undefined) {
            return;
        }
        const messageText = event.data;
        const message = JSON.parse(messageText);

        if (message.type === 'STATE') {
            this.localEventBus.callEvent('updateState', message.payload);
        }

        if (message.type === 'END') {
            this.localEventBus.callEvent('gameOverWS');
        }

        try {
            return {type: message.type, payload: message.payload};
        } catch (err) {
            this.logger.addLog({type: 'websocket', msg: 'Error on handle message', err});
        }
    }

    send(type: any, pressed: any) {
        this.webs.send(JSON.stringify({type, pressed}));
    }
}