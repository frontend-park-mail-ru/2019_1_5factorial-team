import menuView from '../view/menu/viewMenu.js';
import menuModel from '../model/menu/menuModel.js';
import eventBus from '../libs/event/eventbus.js';

const eventList = [
  'checkAuthResponse',
  'checkAuth',
  'signout',
  'signoutResponse',
];

export default class menuController {
  constructor({ globalEventBus = {} } = {}) {
    const EventBus = new eventBus(eventList);
    this.menuView = new menuView({ eventBus: EventBus, globalEventBus });
    this.menuModel = new menuModel(EventBus);
  }
}
