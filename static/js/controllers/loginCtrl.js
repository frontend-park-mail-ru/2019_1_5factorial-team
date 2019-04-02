import loginView from '../views/login/loginView.js';
import loginModel from '../model/loginModel.js';
import EventBus from '../libs/eventBus.js';

const eventList = [
    'login',
    'loginResponse',
    'loginSuccess',
    'loadWaiting',
    'loginService'
];

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