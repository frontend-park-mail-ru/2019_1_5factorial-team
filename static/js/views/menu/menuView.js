import View from '../../libs/views.js';

export default class viewMenu extends View {
    constructor({ eventBus = {} }) {
        super('menu/menuView.tmpl', eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('checkAuthorizationResponse', this.onCheckAuthResponse.bind(this));
    }

    onCheckAuthResponse ({isAuthorized = {}}) {
        const rightBlock = document.querySelector('.right-elems');

        if (!isAuthorized) {
            return;
        } else {
            rightBlock.innerHTML = `<div class="users">
                <a class="btn users__btn_action" href="/profile">profile</a>
                <a class="btn users__btn_action js-signout" href="/">SignOut</a>
            </div>`;
        }
        const signoutButton = document.querySelector('.js-signout');
        signoutButton.addEventListener('click', () => {
            this.localEventBus.callEvent('signOut');
        });
    }

    render(root, data = {}) {
        super.render(root, data);
        this.localEventBus.callEvent('checkAuthorization');
    }
}
