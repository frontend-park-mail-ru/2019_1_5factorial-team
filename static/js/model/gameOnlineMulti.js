import Game from '../components/game/game.js';

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

        this.localEventBus.getEvent('startGame', this.onStart.bind(this));
        this.localEventBus.getEvent('gameOver', this.onGameOver.bind(this));
        this.localEventBus.getEvent('stopGameManualy', this.stopGame.bind(this));
    } 
    onGameOver() {
        if (this.scene.state.isGameOver) {
            this.scene.destroy();
        }
    }   

    stopGame() {

    }

    onStart() {
        this.scene = new Game(this.localEventBus, this.players);
    }
}