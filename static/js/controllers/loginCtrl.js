import loginView from '../views/login/loginView.js';
import loginModel from '../model/loginModel.js';
import EventBus from '../libs/eventBus.js';
import { EVENT_LIST_LOGIN } from '../components/constants.js';

const eventList = EVENT_LIST_LOGIN;

export default class loginController {
    constructor(router) {
        const eventBus = new EventBus(eventList);
        eventBus.getEvent('loginSuccess', () => {
            router.toStartPage();
        });
        this.loginView = new loginView({eventBus});
        this.loginModel = new loginModel(eventBus);
    }
}
