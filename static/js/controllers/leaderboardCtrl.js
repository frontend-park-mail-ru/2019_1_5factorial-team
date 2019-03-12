import leaderboardView from '../views/leaderboard/leaderboardView.js';
import leaderboardModel from '../model/leaderboardModel.js';
import EventBus from '../libs/eventBus.js';

const eventList = [
    'load',
    'loadResponse',
    'loadWaiting',
    'loadPaginator',
    'loadPaginatorResponse',
    'checkAuthorization',
    'checkAuthorizationResponse',
    'checkAuthError',
    'signOut',
    'closeView'
];

export default class leaderboardController {
    constructor() {
        const eventBus = new EventBus(eventList);
        this.leaderboardView = new leaderboardView({ eventBus });
        this.leaderboardModel = new leaderboardModel(eventBus);
    }
}