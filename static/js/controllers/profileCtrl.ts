import profileView from '../views/profile/profileView';
import profileModel from '../model/profileModel';
import EventBus from '../libs/eventBus';
import { EVENT_LIST_PROFILE} from '../components/constants';
import Router from '../libs/router';

const eventList = EVENT_LIST_PROFILE;

export class profileController {
    profileView: profileView;
    profileModel: profileModel;
    constructor(router: Router) {
        const eventBus = new EventBus(eventList);

        eventBus.getEvent('checkAuthError', () => {
            console.log('trying to go to start');
            router.toStartPage();
        });

        this.profileView = new profileView(eventBus);
        this.profileModel = new profileModel(eventBus);
    }
}
