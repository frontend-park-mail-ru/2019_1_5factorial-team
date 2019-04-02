import signUpView from '../views/signUp/signUpView.js';
import signUpModel from '../model/signUpModel.js';
import EventBus from '../libs/eventBus.js';
import { EVENT_LIST_SIGNUP } from '../components/constants.js';

const eventList = EVENT_LIST_SIGNUP;

export default class signUpController {
    constructor({ router } = {}) {
        const eventBus = new EventBus(eventList);

        eventBus.getEvent('signupSuccess', () => {
            router.toStartPage();
        });

        this.signUpView = new signUpView({ eventBus });
        this.signupModel = new signUpModel(eventBus);
    }
}
