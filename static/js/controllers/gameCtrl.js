import gameView from '../views/game/gameView.js';
import gameModel from '../model/gameModel.js';
import EventBus from '../libs/eventBus.js';
import { EVENT_LIST_GAME } from '../components/constants.js';

const eventList = EVENT_LIST_GAME;
let numOfPlayers = 1;

export default class gameController {
    constructor() {
        this.localEventBus = new EventBus(eventList);
        this.gameView = new gameView({ eventList, numOfPlayers } );
        this.gameModel = new gameModel(eventList);
    }
}