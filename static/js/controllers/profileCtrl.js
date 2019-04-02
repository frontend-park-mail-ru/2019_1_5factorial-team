import profileView from '../views/profile/profileView.js';
import profileModel from '../model/profileModel.js';
import EventBus from '../libs/eventBus.js';
import { EVENT_LIST_PROFILE} from '../components/constants.js';

const eventList = EVENT_LIST_PROFILE;

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
