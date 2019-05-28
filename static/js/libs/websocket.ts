import {NETWORK_ADRESS_WS_GAME} from '../components/constants';
import EventBus from "./eventBus";

export default class Ws {
    localEventBus: EventBus;
    webs: any;
    static __instance: Ws;
    constructor(eventBus: EventBus) {
        this.localEventBus = eventBus;
        this.localEventBus.getEvent('sendButton', this.send.bind(this));
        if (Ws.__instance) {
            return Ws.__instance;
        }

        const address = NETWORK_ADRESS_WS_GAME;
        this.webs = new WebSocket(address);

        this.webs.onopen = () => {
            console.log(`WebSocket on address ${address} opened`);

            this.webs.onclose = () => {
                console.log(`WebSocket closed`);
            };

            this.webs.onmessage = this.handleMessage.bind(this);
        };

        Ws.__instance = this;
    }

    closeConn() {
        this.webs.close();
    }

    handleMessage(event: { data: any; }) {
        if (event === undefined) {
            return;
        }
        const messageText = event.data;
        const message = JSON.parse(messageText);
        console.log(message);

        if (message.type === 'STATE') {
            this.localEventBus.callEvent('updateState', message.payload);
        }

        if (message.type === 'END') {
            this.localEventBus.callEvent('gameOverWS');
        }

        try {
            return {type: message.type, payload: message.payload};
        } catch (err) {
            console.error('smth went wront in handleMessage: ', err);
        }
    }

    send(type: any, pressed: any) {
        console.log(type,  pressed);
        this.webs.send(JSON.stringify({type, pressed}));
    }
}