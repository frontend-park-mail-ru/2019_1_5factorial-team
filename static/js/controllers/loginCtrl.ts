import loginView from '../views/login/loginView';

import loginModel from '../model/loginModel';

import EventBus from '../libs/eventBus';
import Router from '../libs/router';
import Logger from '../libs/logger';

import { EVENT_LIST_LOGIN } from '../components/constants';

const eventList = EVENT_LIST_LOGIN;

export class loginController {
    loginView: loginView;
    loginModel: loginModel;
    constructor(router: Router, logger: Logger) {
        const eventBus = new EventBus(eventList);
        eventBus.getEvent('loginSuccess', () => {
            router.toStartPage();
        });
        this.loginView = new loginView(eventBus, logger);
        this.loginModel = new loginModel(eventBus, logger);
    }
}
