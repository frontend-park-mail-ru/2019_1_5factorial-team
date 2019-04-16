import gameView from '../views/game/gameView.js';
import gameOfflineModel from '../model/gameOfflineModel.js';
import EventBus from '../libs/eventBus.js';
import { EVENT_LIST_GAME } from '../components/constants.js';

const eventList = EVENT_LIST_GAME;

export default class gameController {
    constructor() {
        const eventBus = new EventBus(eventList);
        this.gameViewSingle = new gameView({ eventBus });
        // TODO: сделать онлайн модель и выбор нужной модели
        this.gameModelSingle = new gameOfflineModel(eventBus);

    }
}