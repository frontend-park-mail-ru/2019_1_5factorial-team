import Network from '../libs/network.js';
import api from '../libs/api.js';
import {User} from '../libs/users.js';
import userBlock from '../components/userBlock.js';
import { ANAUTH_RESPONSE } from '../components/constants.js';

export default class menuModel {
    constructor(events) {
        this.localEventBus = events;
        this.localEventBus.getEvent('checkAuthorization', this.checkAuthorization.bind(this));
        this.localEventBus.getEvent('signOut', this.onLogout.bind(this));
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
