import signUpView from '../views/signUp/signUpView';
import signUpModel from '../model/signUpModel';
import EventBus from '../libs/eventBus';
import { EVENT_LIST_SIGNUP } from '../components/constants';
import Router from '../libs/router';

const eventList = EVENT_LIST_SIGNUP;

export class signUpController {
    signUpView: signUpView;
    signupModel: signUpModel;
    constructor(router: Router) {
        const eventBus = new EventBus(eventList);

        eventBus.getEvent('signupSuccess', () => {
            router.toStartPage();
        });

        this.signUpView = new signUpView(eventBus);
        this.signupModel = new signUpModel(eventBus);
    }
}
