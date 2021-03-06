import Game from '../components/game/game';
import ModalWindow from '../components/modalWindow/modalWindow';
import EventBus from '../libs/eventBus';
import Logger from '../libs/logger';

/**
 * STATE - состояние игры
 * MOVE - отправляем символ
 * END - игра закончилась
 */

export default class gameOnlineMulti {
    localEventBus: EventBus;
    scene: Game;
    MW: ModalWindow;
    winnerText: Element;
    logger: Logger;

    constructor(eventBus: EventBus, logger: Logger) {
        this.localEventBus = eventBus;
        this.scene = null;
        this.logger = logger;
        this.MW = new ModalWindow();

        this.localEventBus.getEvent('startGame', this.onStart.bind(this));
        this.localEventBus.getEvent('gameOver', this.onGameOver.bind(this));
        this.localEventBus.getEvent('gameOverWS', this.onGameOver.bind(this));
        this.localEventBus.getEvent('stopGameManualy', this.stopGame.bind(this));
        this.localEventBus.getEvent('close', this.stopGame.bind(this));
    }

    onGameOver() {
        if (this.scene.state.isGameOver) {
            this.scene.destroy();
        }
        this.MW.createModal('Game multi end');

        // TODO(): заменить id на никнеймы
        this.winnerText = document.getElementsByClassName('modal-window__header')[0];
        if (this.scene.state.Players[0].hp === 0) {
            this.winnerText.textContent = `Game over! ${this.scene.state.Players[0]} won!`;
        } else {
            this.winnerText.textContent = `Game over! ${this.scene.state.Players[1].id} won!`;
        }
    }  

    stopGame() {
        this.scene.destroy();
    }

    onStart() {
        this.scene = new Game(this.localEventBus, true, this.logger);
    }
}