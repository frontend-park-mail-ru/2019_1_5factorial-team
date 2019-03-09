import signUpView from '../views/signUp/signUpView.js';
import signUpModel from '../model/signUpModel.js';
import EventBus from '../libs/eventBus.js';

const eventList = [
    'signup',
    'signupResponse',
    'signupSuccess',
    'changeEmail',
    'changeEmailResponse',
    'changeLogin',
    'changeLoginResponse',
    'changePassword',
    'changePasswordResponse',
    'changePasswordRepeat',
    'changePasswordRepeatResponse',
    'loadWaiting'
];

export default class signUpController {
    constructor ({ router } = {}) {
        const eventBus = new EventBus(eventList);

        eventBus.getEvent('signupSuccess', () => {
            router.toStartPage();
        });

        this.signUpView = new signUpView({ eventBus });
        this.signupModel = new signUpModel(eventBus);
    }
}
