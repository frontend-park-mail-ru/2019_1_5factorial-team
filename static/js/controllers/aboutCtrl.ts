import aboutView from '../views/about/aboutView';
import aboutModel from '../model/aboutModel';
import EventBus from '../libs/eventBus';
import { EVENT_LIST_ABOUT } from '../components/constants';

const eventList = EVENT_LIST_ABOUT;

export class aboutController {
    aboutView: aboutView;
    aboutModel: aboutModel;
    constructor() {
        const eventBus = new EventBus(eventList);
        this.aboutView = new aboutView(eventBus);
        this.aboutModel = new aboutModel(eventBus);
    }
}