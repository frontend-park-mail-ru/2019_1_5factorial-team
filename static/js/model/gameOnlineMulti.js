import Game from '../components/game/game.js';
import ModalWindow from '../components/modalWindow/modalWindow.js';

/**
 * STATE - состояние игры
 * MOVE - отправляем символ
 * END - игра закончилась
 */

export default class gameOnlineMulti {
    constructor(eventBus) {
        this.localEventBus = eventBus;
        this.scene = null;
        this.MW = new ModalWindow();

        this.localEventBus.getEvent('startGame', this.onStart.bind(this));
        this.localEventBus.getEvent('gameOver', this.onGameOver.bind(this));
        this.localEventBus.getEvent('stopGameManualy', this.stopGame.bind(this));
    } 
    onGameOver() {
        console.log('this.scene first', this.scene);
        if (this.scene.state.isGameOver) {
            this.scene.destroy();
        }
        this.MW.createModal('Game multi end');

        this.winnerText = document.getElementsByClassName('modal-window__header')[0];
        if (this.scene.state.firstPlayer.hp === 0) {
            console.log('first won', this.scene.state.firstPlayer);
            this.winnerText.textContent = `Game over! ${this.scene.state.firstPlayer} won!`;
        } else {
            console.log('second won', this.scene.state.secondPlayer);
            this.winnerText.textContent = `Game over! ${this.scene.state.secondPlayer} won!`;
        }
    }  

    stopGame() {
        this.scene.destroy();
    }

    onStart() {
        this.scene = new Game(this.localEventBus, true);
    }
}