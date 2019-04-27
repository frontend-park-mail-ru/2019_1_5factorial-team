import chatView from '../views/chat/chatView.js';
import chatModel from '../model/chatModel.js';
import EventBus from '../libs/eventBus.js';
import { EVENT_LIST_CHAT } from '../components/constants.js';

const eventList = EVENT_LIST_CHAT;

export default class chatController {
    constructor() {
        const eventBus = new EventBus(eventList);
        this.chatView = new chatView({ eventBus });
        this.chatModel = new chatModel(eventBus);
    }
}
