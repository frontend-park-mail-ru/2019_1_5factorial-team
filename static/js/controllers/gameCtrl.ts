import gameViewSingle from '../views/game/gameViewSingle';
import gameViewMulti from '../views/game/gameViewMulti';
import gameOfflineModel from '../model/gameOfflineModel';
import gameOnlineMulti from '../model/gameOnlineMulti';
import EventBus from '../libs/eventBus';
import { EVENT_LIST_GAME_SINGLE, EVENT_LIST_GAME_MULTI } from '../components/constants';

const eventListSingle = EVENT_LIST_GAME_SINGLE;
const eventListMulti = EVENT_LIST_GAME_MULTI;

export class gameController {
    gameViewSingle: gameViewSingle;
    gameModelSingle: gameOfflineModel;

    gameViewMulti: gameViewMulti;
    gameModelMulti: gameOnlineMulti;
    constructor() {
        const eventBusSingle = new EventBus(eventListSingle);
        const eventBusMulti = new EventBus(eventListMulti);

        this.gameViewSingle = new gameViewSingle(eventBusSingle);
        this.gameModelSingle = new gameOfflineModel(eventBusSingle);

        this.gameViewMulti = new gameViewMulti(eventBusMulti); // сделать вьюшку для мультика
        this.gameModelMulti = new gameOnlineMulti(eventBusMulti);
    }
}