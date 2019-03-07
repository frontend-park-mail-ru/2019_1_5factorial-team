import View from '../../libs/views.js';

export default class leaderboardView extends View {
    constructor({ eventBus = {} }) {
        super('leaderboardView.tmpl', eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
    }

    render(root, data = {}) {
        super.render(root, data);
    }
}