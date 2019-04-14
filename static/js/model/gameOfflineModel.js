import GameScene from '../components/game/gameScene';

export default class gameOfflineModel {
    constructor(eventBus) {
        this.scene = null;

        this.localEventBus = eventBus;

        this.localEventBus.getEvent('startGame', this.onStart.bind(this));
        this.localEventBus.getEvent('gameOver', this.onGameOver.bind(this));
    }

    onStart() {
        this.scene = new GameScene();
    }

    onGameOver() {
    //     if (this.scene.state.isGameOver === true) {
    //         console.log('game over');
    //         this.scene.destroy();
    //     }
    //     // TODO: переброс в меню
    }
}