import View from '../../libs/views.js';
// import Menu from '../../components/menu/menuComponent.js';

export default class viewMenu extends View {
    constructor({ eventBus = {} }) {
        super('menu/menuView.tmpl', eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
        console.log({eventBus});
        this.localEventBus.getEvent('checkAuthorizationResponse', this.onCheckAuthResponse.bind(this));
    }

    //{ isAuth, online = true } = {}
    onCheckAuthResponse ({isAuthorized = {}}) {
        const rightBlock = document.querySelector('.menu-right-block');
        console.log(isAuthorized);
    
        if (!isAuthorized) {
            console.log('no auth in menu');
        } else {
            // <img class="users__avatar" src="img/default.jpg">
            // <div class="users__title">hello</div>
            rightBlock.innerHTML = `<section class="container__block container__block_side">
            <div class="users">
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

    render(root, data = {}) {
        super.render(root, data);
        this.localEventBus.callEvent('checkAuthorization');
    }
}
