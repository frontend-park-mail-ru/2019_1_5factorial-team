import Game from '../../components/game/game.js';
import gameScene from '../../components/game/gameScene.js';
import template from './gameView.tmpl.xml';
import View from '../../libs/views.js';


export default class gameView extends View {
    constructor({eventBus = {}} = {}, mode,  ghosts = {}) {
        super(template, eventBus);
        this.mode = mode;
        this.ghosts = ghosts;
        this.canvas = null;
        this.render(document.getElementsByClassName('body-cnt')[0]);
        // this.localEventBus.getEvent('gameOver', this.gameOver.bind(this));
        // this.numOfPlayers = numOfPlayers; //заглушка, надо перевести в нормальный вид
    }

    render(root, data = {}) {
        super.render(root, data);
        this.canvas = document.getElementsByClassName('temp_class_canvas')[0];
        this.ctx = this.canvas.getContext('2d');
        this.startGame(this.mode);
    }

    startGame(mode) {
        // check game mode
        this.game = new Game(mode, this.canvas);
        this.game.startGame();
    }

    renderScene(canvas) {
        this.scene = new gameScene(canvas, this.ghosts);
        this.scene.render();
    }

    //TODO(): Notificate players in game (Modal or not)
    gameOver({winner, looser}) {
        console.log(looser, 'lost! Gratz to', winner);        
    }
}