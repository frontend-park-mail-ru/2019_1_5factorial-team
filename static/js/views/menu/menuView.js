import View from '../../libs/views.js';
import Menu from '../../components/menu/menuComponent.js';

// import tmpl from './menuView.tmpl';

export default class viewMenu extends View {
    constructor({ eventBus = {} } = {}) {
        super('menu/menuView.tmpl', eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('checkAuthorizationResponse', this.onCheckAuthResponse.bind(this));
    }

    onCheckAuthResponse ({ isAuth, online = true } = {}) {
        let menu;
        const menuSection = this.element.querySelector('.menu-content');
        if (!isAuth && online) {
            menu = new Menu([
                { textLabel: 'Single', href: '/singleplayer' },
                { textLabel: 'Multi',
                    href: '/signin',
                    clickCallback: this.onNotAuthMultiplayerClick.bind(this),
                    isNavigate: false },
                { textLabel: 'Leaders', href: '/leaderboard' },
                { textLabel: 'About', href: '/about' }
            ]);
        } else if (online === false) {
            menu = new Menu([
                { textLabel: 'Single', href: '/singleplayer' },
                { textLabel: 'Multi',
                    href: '',
                    clickCallback: this.onOfflineMultiplayerClick.bind(this),
                    isNavigate: false },
                { textLabel: 'Leaders',
                    href: '/leaderboard',
                    clickCallback: this.onOfflineMultiplayerClick.bind(this),
                    isNavigate: false },
                { textLabel: 'About', href: '/about' }
            ]);
        } else {
            menu = new Menu([
                { textLabel: 'Single', href: '/singleplayer' },
                { textLabel: 'Multi', href: '/multiplayer' },
                { textLabel: 'Leaders', href: '/leaderboard' },
                { textLabel: 'About', href: '/about' }
            ]);
        }

        menu.render(menuSection);
    }

    render(root, data = {}) {
        super.render(root, data);
        // this.localEventBus.callEvent('checkAuthorization');
    }

    onOfflineMultiplayerClick() {

    }

    onNotAuthMultiplayerClick() {

    }
}
