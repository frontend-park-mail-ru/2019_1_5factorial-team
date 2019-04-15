import Game from '../components/game/game.js';
import api from '../libs/api.js';

export default class gameOfflineModel {
    constructor(eventBus) {
        this.scene = null;
        this.localEventBus = eventBus;

        this.localEventBus.getEvent('startGame', this.onStart.bind(this));
        this.localEventBus.getEvent('gameOver', this.onGameOver.bind(this));
        this.localEventBus.getEvent('getUserDataForGame', this.getUser.bind(this));
        this.localEventBus.getEvent('stopGameManualy', this.stopGame.bind(this));
    }

    getUser() {
        return api.loadUser()
            .then(res => {
                if (res.error) {
                    this.localEventBus.callEvent('onGetUserDataForGameResponse', {});
                } else {
                    // TODO(): подбить некоторые данные для статистики - победы/поражения
                    const responseOnUser = {
                        nickname: res.nickname,
                    };
                    this.localEventBus.callEvent('onGetUserDataForGameResponse', {user: responseOnUser});
                }
            });
    }

    onStart() {
        this.scene = new Game(this.localEventBus);
    }

    stopGame() {
        this.scene.destroy();
    }

    onGameOver() {
        if (this.scene.state.isGameOver === true) {
            console.log('game over');
            this.scene.destroy();
        }
    }
}