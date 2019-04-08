import View from '../../libs/views.js';
import gameScene from '../../components/game/gameScene.js';
import template from './gameView.tmpl.xml';


export default class gameView extends View {
    constructor({eventBus = {}} = {}) {
        super(template, eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
        // this.main = document.getElementsByClassName('main-container')[0];
        // this.main.innerHTML = `<canvas class="temp_class_canvas" id="canvas" width="500" height="500"></canvas>`;
        // this.localEventBus.getEvent('gameOver', this.gameOver.bind(this));
        // this.numOfPlayers = numOfPlayers; //заглушка, надо перевести в нормальный вид
    }

    render(root, data = {}) {
        super.render(root, data);
        this.canvas = document.getElementsByClassName('temp_class_canvas')[0];
        console.log('gameView', this.canvas);
        this.renderScene(this.canvas);
    }

    //TODO(): class City - игровое поле, на котором происходит рендер всего, что движется и прочее
    renderScene(canvas) {
        // this.data = data; //заглушка, рендерить будем с никами и прочим
        // this.root = root;
        this.scene = new gameScene(canvas);
        this.scene.render();
        // this.city = new City();
        // this.city.render();
    }

    //TODO(): Notificate players in game (Modal or not)
    gameOver({winner, looser}) {
        console.log(looser, 'lost! Gratz to', winner);        
    }
}