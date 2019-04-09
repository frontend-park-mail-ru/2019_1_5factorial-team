export default class GameCore {
    constructor(scene) {
        this.scene = scene;

    }

    start() {
        this.gameInterval = setInterval(function() {
            console.log('try');
        }, 50);
    }

    stop() {
        clearInterval(this.gameInterval);
        this.scene.stop();
    }
}