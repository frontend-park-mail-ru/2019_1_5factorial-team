import menuModel from '../model/menuModel.js';
import menuView from '../views/menu/menuView.js';
import EventBus from '../libs/eventBus.js';

const eventList = [
    'checkAuthorizationResponse',
    'checkAuthorization',
    'signoutResponse',
    'signOut',
    'car'
];

export default class menuController {
    constructor() {
        const eventBus = new EventBus(eventList);
        this.menuView = new menuView({eventBus});
        this.menuModel = new menuModel(eventBus);
    }
}