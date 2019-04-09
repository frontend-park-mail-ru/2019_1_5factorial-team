import GameCore from './gameCore.js';
// const Ws = require('Ws');    
// const ws = new Ws();

export default class offlineGame extends GameCore {
    start() {
        super.start();
        console.log('inside got off');
        // ws.send('start-game', null);
        this.scene.start();
    }

    // onControllsPressed(evt) {
    //     if (this._pressed('LEFT', evt)) {
    //         ws.send('game-command', 'LEFT');
    //     } else if (this._pressed('RIGHT', evt)) {
    //         ws.send('game-command', 'RIGHT');
    //     } else if (this._pressed('FIRE', evt)) {
    //         ws.send('game-command', 'FIRE');
    //     }
    // }

    onGameStarted() {
        // this.controller.start();
        // this.scene.init(evt);
        this.scene.start();
    }

    // onGameFinished(evt) {
    //     bus.emit('CLOSE_GAME');
    // }

    // onGameStateChanged(evt) {
    //     this.scene.setState(evt);
    // }
}