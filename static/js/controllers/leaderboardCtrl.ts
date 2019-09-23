import leaderboardView from '../views/leaderboard/leaderboardView';

import leaderboardModel from '../model/leaderboardModel';

import EventBus from '../libs/eventBus';
import Logger from '../libs/logger';

import { EVENT_LIST_LEADERBOARS } from '../components/constants';

const eventList = EVENT_LIST_LEADERBOARS;

export class leaderboardController {
    leaderboardView: leaderboardView;
    leaderboardModel: leaderboardModel;
    constructor(logger: Logger) {
        const eventBus = new EventBus(eventList);
        this.leaderboardView = new leaderboardView(eventBus, logger);
        this.leaderboardModel = new leaderboardModel(eventBus, logger);
    }
}
