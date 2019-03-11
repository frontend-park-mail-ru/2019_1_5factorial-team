import aboutView from '../views/about/aboutView.js';
import EventBus from '../libs/eventBus.js';
import aboutModel from '../model/aboutModel.js';

const eventList = [
    'checkAuthorizationResponse',
    'checkAuthorization',
    'signOut',
    'car'
];

export default class aboutController {
    constructor() {
        const eventBus = new EventBus(eventList);
        this.aboutView = new aboutView({ eventBus });
        this.aboutModel = new aboutModel(eventBus);
    }
}