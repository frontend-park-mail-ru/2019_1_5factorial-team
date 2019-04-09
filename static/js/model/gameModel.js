import Game from '../components/game/game.js';

export default class gameModel {
    constructor(eventBus, ghosts = {}) {
        this.canvas = document.getElementsByClassName('temp_class_canvas')[0];
        this.game = new Game('offline', this.canvas, ghosts);
        this.localEventBus = eventBus;
    }
}