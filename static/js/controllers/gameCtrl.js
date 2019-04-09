import gameView from '../views/game/gameView.js';
import gameModel from '../model/gameModel.js';
import EventBus from '../libs/eventBus.js';
import { EVENT_LIST_GAME } from '../components/constants.js';

const eventList = EVENT_LIST_GAME;
// let numOfPlayers = 1;
const ghosts = {
    first: {
        color: 'blue'
    },
    second: {
        color: 'yellow'
    }
};

export default class gameController {
    constructor() {
        const eventBus = new EventBus(eventList);
        this.gameView = new gameView({ eventBus }, ghosts);
        this.gameModel = new gameModel(eventBus, ghosts);
    }
}