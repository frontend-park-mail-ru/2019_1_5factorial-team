import View from '../../libs/views.js';


export default class gameView extends View {
    constructor({eventBus, numOfPlayers = 1} = {}) {
        super(null, eventBus);
        this.localEventBus.getEvent('gameOver', this.gameOver.bind(this));
        this.numOfPlayers = numOfPlayers; //заглушка, надо перевести в нормальный вид
    }

    //TODO(): class City - игровое поле, на котором происходит рендер всего, что движется и прочее
    render(root, data) {
        this.data = data; //заглушка, рендерить будем с никами и прочим
        this.root = root;
        // this.city = new City();
        // this.city.render();
    }

    //TODO(): Notificate players in game (Modal or not)
    gameOver({winner, looser}) {
        console.log(looser, 'lost! Gratz to', winner);        
    }
}