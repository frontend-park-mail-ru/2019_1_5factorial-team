import Game from '../components/game/game.js';
import ModalWindow from '../components/modalWindow.js';
import Ws from '../libs/websocket.js';

/**
 * STATE - состояние игры
 * MOVE - отправляем символ
 * END - игра закончилась
 */

export default class gameOnlineMulti {
    constructor(eventBus) {
        this.localEventBus = eventBus;
        this.scene = null;
        this.players = {
            firstPlayer: {
                test: 1,
            },
            secondPlayer: {
                test: 2,
            },
        };
        this.MW = new ModalWindow();
        this.ws = new Ws();

        this.localEventBus.getEvent('startGame', this.onStart.bind(this));
        this.localEventBus.getEvent('gameOver', this.onGameOver.bind(this));
        this.localEventBus.getEvent('stopGameManualy', this.stopGame.bind(this));
    } 
    onGameOver() {
        this.ws.send('MOVE', 'up');
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
        this.ws.closeConn();
    }  

    stopGame() {
        // let answerWs = this.ws.handleMessage();
        this.ws.closeConn();
        if (answerWs !== undefined) {
            if (answerWs.type === 'END') {
                console.log('STOPPED ON FRONT');
            } else {
                this.ws.closeConn();
            }
        }
    }

    onStart() {
        this.localEventBus.callEvent('startWs');
        let answerWs = this.ws.handleMessage();
        console.log('test', this);
        if (answerWs !== undefined) {
            this.scene = new Game(this.localEventBus, answerWs.payload);
        }
    }
}