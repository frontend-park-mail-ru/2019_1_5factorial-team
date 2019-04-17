import template from './gameView.tmpl.xml';
import View from '../../libs/views.js';
import userBlock from '../../components/userBlock.js';
import ModalWindow from '../../components/modalWindow.js';

export default class gameViewSingle extends View {
    constructor(eventBus) {
        console.log(eventBus);
        super(template, eventBus);
        this.MW = new ModalWindow();
        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('onGetUserDataForGameResponse', this.getUserResponse.bind(this));
        this.localEventBus.getEvent('gameOverRender', this.gameOverRender.bind(this));
    }

    getUserResponse(data = {}) {
        if (data) {
            this.render(null, data);
        }
    }

    gameOverRender() {
        let finalScore = this.scene.state.score;
        this.MW.createModal('Game single end');
        const scoreElement = document.getElementsByClassName('js-set-final-score')[0];
        scoreElement.innerText = `Your score is : ${finalScore}`;
    }

    render(root, data = {}) {
        super.render(root, data);
        
        if (Object.keys(data).length === 0) {
            console.log(this.localEventBus);
            this.localEventBus.callEvent('getUserDataForGame');
        } else {
            super.render(root, data);

            const block = new userBlock();
            block.gameButtons(data);
            this.localEventBus.callEvent('startGame');  

            const menuButton = document.getElementsByClassName('js-back-to-menu')[0];
            menuButton.addEventListener('click', () => {
                this.localEventBus.callEvent('stopGameManualy');
            });
        }
    }
}