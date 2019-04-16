import gameView from '../views/game/gameView.js';
import gameOfflineModel from '../model/gameOfflineModel.js';
import gameOnlineMulti from '../model/gameOnlineMulti.js';
import EventBus from '../libs/eventBus.js';
import { EVENT_LIST_GAME_SINGLE, EVENT_LIST_GAME_MULTI } from '../components/constants.js';

const eventListSingle = EVENT_LIST_GAME_SINGLE;
const eventListMulti = EVENT_LIST_GAME_MULTI;

export default class gameController {
    constructor() {
        const eventBusSingle = new EventBus(eventListSingle);
        const eventBusMulti = new EventBus(eventListMulti);
        
        this.gameViewSingle = new gameView({ eventBusSingle });
        this.gameViewMulti = new gameView({ eventBusMulti }); // сделать вьюшку для мультика

        this.gameModelSingle = new gameOfflineModel(eventBusSingle);
        this.gameModelMulti = new gameOnlineMulti(eventBusMulti);
    }
}