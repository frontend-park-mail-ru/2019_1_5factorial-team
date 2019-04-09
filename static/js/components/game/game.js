import gameScene from './gameScene.js';
// import gameCore from './core/gameCore.js';
import onlineGame from './core/onlineMode.js';
import offlineGame from './core/offlineMode.js';
// const HP = 3;

export default class Game {
    constructor(mode = 'offline', canvas, ghosts = {}) {
        // this.player = null;
        // this.interval = null;
        // this.gameState = null;
        // this.scene = new gameScene(canvas, ghosts);
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
        // this.gameState = {
        //     player: {
        //         // TODO: get player's position
        //         xpos: this.player.xpos,
        //         hp: HP
        //     }
        // };
        // // this.interval = requestAnimationFrame(this.gameLoop.bind(this));
        // this.interval = setInterval(() => this.gameLoop(), 100);
    }

    stopGame() {
        this.core.stop();
    }

    // gameLoop() {
    //     // console.log('100');
    //     if (this.player.hp <= 0) {
    //         this.stopGame();
    //     }
    //     // this.scene.render();
    //     this.interval = setInterval(() => this.gameLoop(), 100);
    //     // this.interval = requestAnimationFrame(this.gameLoop.bind(this));
    // }

    // stopGame() {
    //     this.player = null;
    // }

    // /**
    //  * @param {object} data - ghost.object
    //  * */
    // moveObjectTo(data) {
    //     if (data.speed > 0) {
    //         this.gameState.xpos += data.speed * 1; // TODO: тики тут вместо единицы
    //     } else if (data.speed < 0) {
    //         this.gameState.xpos -= data.speed * 1; // TODO: тики тут вместо единицы
    //     } else if (data.speed === 0) {
    //         // TODO: остановка моба перед игроком
    //     }
    // }
}