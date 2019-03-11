import View from '../../libs/views.js';

export default class aboutView extends View {
    constructor({ eventBus = {} } = {}) {
        super('about/about.tmpl', eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('checkAuthorizationResponse', this.onCheckAuthResponse.bind(this));
    }

    render(root, data = {}) {
        super.render(root, data);
        this.localEventBus.callEvent('checkAuthorization');
    }

    onCheckAuthResponse ({isAuthorized} = {}) {
        const rightBlock = document.querySelector('.main-right-block');
        console.log(isAuthorized);
    
        if (!isAuthorized) {
            console.log('no auth in menu');
        } else {
            rightBlock.innerHTML = `<section class="container__block container__block_side">
            <div class="users">
                <img class="users__avatar" src="img/default.jpg">
                <div class="users__title">hello</div>
                <a class="btn users__btn_action" href="/profile">profile</a>
                <a class="btn users__btn_action js-signout" href="/">SignOut</a>
            </div>
            </section>`;
            console.log('auth in menu');
        }

        const signoutButton = document.querySelector('.js-signout');
        signoutButton.addEventListener('click', () => {
            this.localEventBus.callEvent('signOut');
        });
    }

}
