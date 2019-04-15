import menuModel from '../model/menuModel.js';
import menuView from '../views/menu/menuView.js';
import EventBus from '../libs/eventBus.js';
import { EVENT_LIST_MENU } from '../components/constants.js';

const eventList = EVENT_LIST_MENU;

export default class menuController {
    constructor() {
        const eventBus = new EventBus(eventList);
        this.menuView = new menuView({eventBus});
        this.menuModel = new menuModel(eventBus);
    }
}
