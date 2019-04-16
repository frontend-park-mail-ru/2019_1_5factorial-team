import template from './gameView.tmpl.xml';
import View from '../../libs/views.js';
// import userBlock from '../../components/userBlock.js';

export default class gameViewMulti extends View {
    constructor(eventBus) {
        super(template, eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
    }

    render(root, data = {}) {
        this.root = root;
        this.data = data;
    }
}