import signUpView from '../views/signUp/signUpView';

import signUpModel from '../model/signUpModel';

import EventBus from '../libs/eventBus';
import Router from '../libs/router';
import Logger from '../libs/logger';

import { EVENT_LIST_SIGNUP } from '../components/constants';

const eventList = EVENT_LIST_SIGNUP;

export class signUpController {
    signUpView: signUpView;
    signupModel: signUpModel;
    constructor(router: Router, logger: Logger) {
        const eventBus = new EventBus(eventList);

        eventBus.getEvent('signupSuccess', () => {
            router.toStartPage();
        });

        this.signUpView = new signUpView(eventBus, logger);
        this.signupModel = new signUpModel(eventBus, logger);
    }
}
