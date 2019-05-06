import Network from '../libs/network.js';
import api from '../libs/api.js';
import {User} from '../libs/users.js';
import userBlock from '../components/userBlock/userBlock.js';
import { ANAUTH_RESPONSE } from '../components/constants.js';

export default class menuModel {
    constructor(events) {
        this.localEventBus = events;
        this.localEventBus.getEvent('checkAuthorization', this.checkAuthorization.bind(this));
        this.localEventBus.getEvent('signOut', this.onLogout.bind(this));
    }

    detectmob() { 
        if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
        ) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Заканчиваем сессию пользователя
     */
    onLogout() {
        api.deleteSession();
        const isAuthorized = false;
        this.localEventBus.callEvent('closeView', { isAuth: isAuthorized, signout: true });
        const checkHeader = new userBlock();
        checkHeader.changeButtons(isAuthorized);
        User.removeUser();
    }

    /**
     * Проверяем пользователя - авторизован ли
     */
    checkAuthorization() {
        this.detectmob() ? window.open('https://google.com') : console.log('false');
        const res = Network.doGet({ url: '/api/session' });
        res.then(res => {
            if (res.status === ANAUTH_RESPONSE) {
                this.localEventBus.callEvent('checkAuthorizationResponse', {
                    isAuthorized: false,
                    statusText: res.statusText,
                    error: res.error
                });
            } else {
                this.localEventBus.callEvent('checkAuthorizationResponse', {
                    statusText: res.statusText, 
                    isAuthorized: true,
                });
            }
        });
    }
}
