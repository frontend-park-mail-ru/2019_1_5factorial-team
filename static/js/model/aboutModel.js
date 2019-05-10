import api from '../libs/api.js';
import Network from '../libs/network.js';
import {User} from '../libs/users.js';
import userBlock from '../components/userBlock/userBlock.js';
import { ANAUTH_RESPONSE } from '../components/constants.js';

export default class aboutModel {
    constructor(eventBus) {
        this.localEventBus = eventBus;
        this.localEventBus.getEvent('checkAuthorization', this.checkAuthorization.bind(this));
        this.localEventBus.getEvent('signOut', this.onLogout.bind(this));
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
                    error: res.error
                });
            } else {
                this.localEventBus.callEvent('checkAuthorizationResponse', {
                    isAuthorized: true,
                });
            }
        });
    }

    /**
     * Заканчиваем сессию пользователя
     */
    onLogout() {
        api.deleteSession();
        const isAuthorized = false;
        const checkHeader = new userBlock();
        checkHeader.changeButtons(isAuthorized);
        this.localEventBus.callEvent('closeView', { isAuth: false, signout: true });
        User.removeUser();
    }
}
