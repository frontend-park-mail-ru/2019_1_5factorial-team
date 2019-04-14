import GameScene from '../components/game/gameScene';

export default class gameOfflineModel {
    constructor(eventBus) {
        this.scene = null;

        this.localEventBus = eventBus;

        this.localEventBus.getEvent('startGame', this.onStart.bind(this));
        this.localEventBus.getEvent('newState', this.onNewState.bind(this));
        this.localEventBus.getEvent('gameOver', this.onGameOver.bind(this));
    }

    onStart() {
        this.scene = new GameScene();
    }

    onNewState() {

    }

    onGameOver() {
        this.scene.destroy();
    }
}