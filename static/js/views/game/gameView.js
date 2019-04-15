import template from './gameView.tmpl.xml';
import View from '../../libs/views.js';
import userBlock from '../../components/userBlock.js';

export default class gameView extends View {
    constructor({eventBus = {}} = {}) {
        super(template, eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('onGetUserDataForGameResponse', this.getUserResponse.bind(this));

    }

    getUserResponse(data = {}) {
        console.log('onResponse', data);
        if (data) {
            this.render(null, data);
        }
    }

    // TODO(): Norrmal nickname getter
    render(root, data = {}) {
        this.localEventBus.callEvent('getUserDataForGame');
        // this.data = data; // загглушка ахахах
        // console.log('data is ', data);
        // const dataTemp = {
        //     userName: 'Test'
        // };
        super.render(root, data);
        console.log('data to render', data);
        const block = new userBlock();
        block.gameButtons(data);
        this.localEventBus.callEvent('startGame');  
    }
}