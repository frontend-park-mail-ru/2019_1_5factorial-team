import GameScene from '../components/game/gameScene';

import offlineGameHandler from '../components/game/core/offlineMode';
import onlineGameHandler from '../components/game/core/onlineMode';

export default class gameModel {
    constructor(eventBus, mode) {
        this.scene = null;

        this.mode = mode;
        this.handler = null;

        this.localEventBus = eventBus;

        this.localEventBus.getEvent('startGame', this.onStart.bind(this));
        this.localEventBus.getEvent('newState', this.onNewState.bind(this));
        this.localEventBus.getEvent('gameOver', this.onGameOver.bind(this));
    }

    onStart() {
        switch (this.mode) {
            case 'offline': {
                this.handler = new offlineGameHandler(this.localEventBus);
                break;
            }
            case 'online': {
                this.handler = new onlineGameHandler();
                break;
            }
            default: {
                console.log('Unknown mode' + this.mode);
                break;
            }
        }

        this.scene = new GameScene();
    }

    onNewState() {

    }

    onGameOver() {
        this.scene.destroy();
    }
}