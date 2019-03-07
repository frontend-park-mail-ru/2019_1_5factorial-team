import menuModel from '../model/menuModel.js';
import menuView from '../views/menu/menuView.js';
import eventBus from '../libs/eventBus.js';

const eventList = [
    'checkAuthorizationResponse',
    'checkAuthorization',
    'signoutResponse',
    'signOut',
];

export default class menuController {
    constructor({ globalEventBus = {} } = {}) {
        const EventBus = new eventBus(eventList);
        this.menuView = new menuView({ eventBus, globalEventBus });
        this.menuModel = new menuModel(EventBus);
    }
}