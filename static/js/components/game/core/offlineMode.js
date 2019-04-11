const KEYS = {
    LEFT: ['a', 'A', 'ф', 'Ф', 'ArrowLeft'],
    RIGHT: ['d', 'D', 'в', 'В', 'ArrowRight'],
    DOWN: ['s', 'S', 'ы', 'Ы', 'ArrowDown'],
    UP: ['w', 'W', 'ц', 'Ц', 'ArrowUp'],
};

export default class offlineGameHandler {
    constructor(eventBus) {
        this.localEventBus = eventBus;
        this.localEventBus.getEvent('newCommand', this.onNewCommand.bind(this));

        this.interval = null;

        this.state = {
            hero: {
                xpos: 50,
                hp: 3
            },
            ghosts: [],
            buttonsPressed: []
        };

        this.startGame();
    }

    startGame() {
        this.interval = setInterval(() => this.gameLoop(), 100);

        // this.localEventBus.callEvent('newCommand', this.onNewCommand.bind(this));
    }

    stopGame() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    onNewCommand() {
    }

    gameLoop() {
        this.localEventBus.callEvent('newCommand');

        if (this.state.hero.hp <= 0) {
            console.log('Game over');
            return;
        }
    }

    _pressed(name, data) {
        return KEYS[name].some(k => data[k.toLowerCase()]);
    }
}