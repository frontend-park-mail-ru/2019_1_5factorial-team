import leaderboardView from '../views/leaderboard/leaderboardView.js';
import leaderboardModel from '../model/leaderboardModel.js';
import EventBus from '../libs/eventBus.js';
import { EVENT_LIST_LEADERBOARS } from '../components/constants.js';

const eventList = EVENT_LIST_LEADERBOARS;

export default class leaderboardController {
    constructor() {
        const eventBus = new EventBus(eventList);
        this.leaderboardView = new leaderboardView({ eventBus });
        this.leaderboardModel = new leaderboardModel(eventBus);
    }
}
