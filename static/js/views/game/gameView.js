import View from '../../libs/views.js';
import gameScene from '../../components/game/gameScene.js';
import template from './gameView.tmpl.xml';


export default class gameView extends View {
    constructor({eventBus = {}} = {}, ghosts = {}) {
        super(template, eventBus);
        this.ghosts = ghosts;
        this.render(document.getElementsByClassName('body-cnt')[0]);
        // this.localEventBus.getEvent('gameOver', this.gameOver.bind(this));
        // this.numOfPlayers = numOfPlayers; //заглушка, надо перевести в нормальный вид
    }

    render(root, data = {}) {
        super.render(root, data);
        this.canvas = document.getElementsByClassName('temp_class_canvas')[0];
        console.log('gameView', this.canvas);
        this.renderScene(this.canvas);
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