import gameScene from './gameScene.js';
// import gameCore from './core/gameCore.js';
import onlineGame from './core/onlineMode.js';
import offlineGame from './core/offlineMode.js';
// const HP = 3;

export default class Game {
    constructor(mode = 'offline', canvas, ghosts = {}) {
        let modeToBuild = null;
        this.scene = new gameScene(canvas, ghosts);
        
        switch (mode) {
            case 'online': {
                modeToBuild = onlineGame;
                break;
            }
            case 'offline': {
                modeToBuild = offlineGame;
                break;
            }
            default:
                throw new Error('Invalid game mode ' + mode);
        }

        this.core = new modeToBuild(this.scene);
    }

    startGame() {
        this.core.start();
    }

    stopGame() {
        this.core.stop();
    }
}