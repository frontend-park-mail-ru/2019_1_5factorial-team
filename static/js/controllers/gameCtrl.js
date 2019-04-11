import gameView from '../views/game/gameView.js';
import gameModel from '../model/gameModel.js';
import EventBus from '../libs/eventBus.js';
import { EVENT_LIST_GAME } from '../components/constants.js';

const eventList = EVENT_LIST_GAME;

// пока что
// const mode = 'offline';

export default class gameController {
    constructor() {
        const eventBus = new EventBus(eventList);

        this.gameView = new gameView({ eventBus });
        this.gameModel = new gameModel(eventBus);
    }
}