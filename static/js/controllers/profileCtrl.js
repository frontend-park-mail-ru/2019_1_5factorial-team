import profileView from '../views/profile/ProfileView.js';
import profileModel from '../model/profileModel.js';
import EventBus from '../libs/eventBus.js';

const eventList = [
    'ca',
    'car',
    'lu',
    'lur',
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
    'sout'
];

export default class ProfileController {
    constructor ({ router } = {}) {
        const eventBus = new EventBus(eventList);

        eventBus.getEvent('checkAuthError', () => {
            router.toStartPage();
        });

        this.profileView = new profileView({ eventBus });
        this.profileModel = new profileModel(eventBus);
    }
}
