import loginView from '../views/login/loginView';
import loginModel from '../model/loginModel';
import EventBus from '../libs/eventBus';
import { EVENT_LIST_LOGIN } from '../components/constants';
import Router from '../libs/router';

const eventList = EVENT_LIST_LOGIN;

export class loginController {
    loginView: loginView;
    loginModel: loginModel;
    constructor(router: Router) {
        const eventBus = new EventBus(eventList);
        eventBus.getEvent('loginSuccess', () => {
            router.toStartPage();
        });
        this.loginView = new loginView(eventBus);
        this.loginModel = new loginModel(eventBus);
    }
}
