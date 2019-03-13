import profileView from '../views/profile/profileView.js';
import profileModel from '../model/profileModel.js';
import EventBus from '../libs/eventBus.js';

const eventList = [
    'checkAuth',
    'checkAuthResponse',
    'loadUser',
    'loadUserResponse',
    'checkAuthError',
    'changeEmail',
    'changeEmailResponse',
    'changePassword',
    'changePasswordResponse',
    'changeAvatar',
    'changeAvatarResponse',
    'changeAvatarSuccess',
    'submitEmail',
    'submitEmailResponse',
    'submitEmailSuccess',
    'submitPassword',
    'submitPasswordResponse',
    'submitPasswordSuccess',
    'logOutResponse',
    'signOut',
    'closeView'
];

export default class ProfileController {
    constructor({ router } = {}) {
        const eventBus = new EventBus(eventList);

        eventBus.getEvent('checkAuthError', () => {
            router.toStartPage();
        });

        this.profileView = new profileView({ eventBus });
        this.profileModel = new profileModel(eventBus);
    }
}
