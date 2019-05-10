import menuModel from '../model/menuModel';
import menuView from '../views/menu/menuView';
import EventBus from '../libs/eventBus';
import { EVENT_LIST_MENU } from '../components/constants';

const eventList = EVENT_LIST_MENU;

export class menuController {
    menuView: menuView;
    menuModel: menuModel;
    constructor() {
        const eventBus = new EventBus(eventList);
        this.menuView = new menuView(eventBus);
        this.menuModel = new menuModel(eventBus);
    }
}
