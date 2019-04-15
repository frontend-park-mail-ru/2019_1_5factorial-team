import aboutView from '../views/about/aboutView.js';
import aboutModel from '../model/aboutModel.js';
import EventBus from '../libs/eventBus.js';
import { EVENT_LIST_ABOUT } from '../components/constants.js';

const eventList = EVENT_LIST_ABOUT;

export default class aboutController {
    constructor() {
        const eventBus = new EventBus(eventList);
        this.aboutView = new aboutView({ eventBus });
        this.aboutModel = new aboutModel(eventBus);
    }
}
