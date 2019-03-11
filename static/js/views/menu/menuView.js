import View from '../../libs/views.js';
// import Menu from '../../components/menu/menuComponent.js';

export default class viewMenu extends View {
    constructor({ eventBus = {} }) {
        super('menu/menuView.tmpl', eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
        console.log({eventBus});
        this.localEventBus.getEvent('checkAuthorizationResponse', this.onCheckAuthResponse.bind(this));
        // this.localEventBus.getEvent('checkAuthorizationResponse', this.onCheckAuthResponse.bind(this));
    }

    //{ isAuth, online = true } = {}
    onCheckAuthResponse ({isAuthorized} = {}) {
        const rightBlock = document.querySelector('.menu-right-block');
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

            //logout svg
            // <svg xmlns="http://www.w3.org/2000/svg" width="0.7em" height="0.7em" viewBox="0 0 16 16">
            //                 <path fill-rule="evenodd" d="M16 11.489c0 1.768-1.599 2.568-1.599 2.568l-2.684 1.791-.001.001a1.164 1.164 0 0 1-1.718-1.027l.001-.155V14H7a2 2 0 0 1-2-2v-2a1 1 0 0 1 2 0v1.403c0 .329.267.597.597.597h2.402L10 9V5.692c0-1.796 1.503-2.463 1.503-2.463l2.228-1.131A.594.594 0 0 0 13.403 2H7.597A.597.597 0 0 0 7 2.597V4a1 1 0 0 1-2 0V2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v9.489zM.307 6.278l1.986-1.985a1 1 0 0 1 1.414 1.414L3.414 6H7a1 1 0 0 1 0 2H3.414l.293.293a1 1 0 0 1-1.414 1.414L.307 7.722l-.014-.015a.983.983 0 0 1-.276-.523v-.001l-.001-.001v-.005l-.001-.003v-.003l-.001-.003v-.001a.82.82 0 0 1-.012-.101v-.011l-.001-.001v-.022H0v-.063l.001-.001v-.01a.985.985 0 0 1 .292-.665l.014-.015z"/>
            //             </svg>
            console.log('auth in menu');
        }

        const signoutButton = document.querySelector('.js-signout');
        signoutButton.addEventListener('click', () => {
            this.localEventBus.callEvent('signOut');
        });

        // let menu;
        // const menuSection = this.element.querySelector('.menu-content');
        // if (!isAuth && online) {
        //     menu = new Menu([
        //         { textLabel: 'Single', href: '/singleplayer' },
        //         { textLabel: 'Multi',
        //             href: '/signin',
        //             clickCallback: this.onNotAuthMultiplayerClick.bind(this),
        //             isNavigate: false },
        //         { textLabel: 'Leaders', href: '/leaderboard' },
        //         { textLabel: 'About', href: '/about' }
        //     ]);
        // } else if (online === false) {
        //     menu = new Menu([
        //         { textLabel: 'Single', href: '/singleplayer' },
        //         { textLabel: 'Multi',
        //             href: '',
        //             clickCallback: this.onOfflineMultiplayerClick.bind(this),
        //             isNavigate: false },
        //         { textLabel: 'Leaders',
        //             href: '/leaderboard',
        //             clickCallback: this.onOfflineMultiplayerClick.bind(this),
        //             isNavigate: false },
        //         { textLabel: 'About', href: '/about' }
        //     ]);
        // } else {
        //     menu = new Menu([
        //         { textLabel: 'Single', href: '/singleplayer' },
        //         { textLabel: 'Multi', href: '/multiplayer' },
        //         { textLabel: 'Leaders', href: '/leaderboard' },
        //         { textLabel: 'About', href: '/about' }
        //     ]);
        // }

        // menu.render(menuSection);
    }

    render(root, data = {}) {
        super.render(root, data);
        this.localEventBus.callEvent('checkAuthorization');
    }

    onOfflineMultiplayerClick() {

    }

    onNotAuthMultiplayerClick() {

    }
}
