import View from '../../libs/views.js';

export default class loginView extends View {
    constructor({ eventBus = {} }) {
        super('login/loginView.tmpl', eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
    }

    render(root, data = {}) {
        super.render(root, data);
    }
}