import leaderboardView from '../views/leaderboard/leaderboardView';
import leaderboardModel from '../model/leaderboardModel';
import EventBus from '../libs/eventBus';
import { EVENT_LIST_LEADERBOARS } from '../components/constants';

const eventList = EVENT_LIST_LEADERBOARS;

export class leaderboardController {
    leaderboardView: leaderboardView;
    leaderboardModel: leaderboardModel;
    constructor() {
        const eventBus = new EventBus(eventList);
        this.leaderboardView = new leaderboardView(eventBus);
        this.leaderboardModel = new leaderboardModel(eventBus);
    }
}
