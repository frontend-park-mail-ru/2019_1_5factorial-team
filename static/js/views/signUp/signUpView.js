import View from '../../libs/views.js';

export default class signUpView extends View {
    constructor({ eventBus = {} }) {
        super('signUpView.tmpl', eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
    }

    render(root, data = {}) {
        super.render(root, data);
    }
}