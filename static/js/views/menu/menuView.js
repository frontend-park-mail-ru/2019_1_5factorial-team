import View from '../../libs/views.js';

export default class viewMenu extends View {
    constructor({ eventBus = {} }) {
        super('menu/menuView.tmpl', eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('checkAuthorizationResponse', this.onCheckAuthResponse.bind(this));
    }

    // TODO(): сменить 'хеддер' после логаута
    onCheckAuthResponse({isAuthorized = false}) {
        const rightBlock = document.getElementsByClassName('js-check-auth')[0];

        if (!isAuthorized) {
            return;
        } else {
            rightBlock.innerHTML = `<a class="btn users__btn_action" href="/profile">profile</a>
                <a class="btn users__btn_action js-signout" href="/">SignOut</a>`;
        }
        const signoutButton = document.getElementsByClassName('js-signout')[0];
        signoutButton.addEventListener('click', () => {
            this.localEventBus.callEvent('signOut');
        });
    }

    render(root, data = {}) {
        super.render(root, data);
        this.localEventBus.callEvent('checkAuthorization');
    }
}
