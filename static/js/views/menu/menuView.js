import View from '../../libs/views.js';
// import Menu from '../../components/menu/menuComponent.js';

export default class viewMenu extends View {
    constructor({ eventBus = {} }) {
        super('menuView.tmpl', eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
    }

    render(root, data = {}) {
        super.render(root, data);
    }

    onOfflineMultiplayerClick() {

    }

    onNotAuthMultiplayerClick() {

    }
}