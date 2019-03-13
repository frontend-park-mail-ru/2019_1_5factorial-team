import aboutView from '../views/about/aboutView.js';
import aboutModel from '../model/aboutModel.js';
import EventBus from '../libs/eventBus.js';

const eventList = [
    'checkAuthorizationResponse',
    'checkAuthorization',
    'signOut',
    'closeView'
];

export default class aboutController {
    constructor() {
        const eventBus = new EventBus(eventList);
        this.aboutView = new aboutView({ eventBus });
        this.aboutModel = new aboutModel(eventBus);
    }
}