import Network from '../libs/network.js';
import api from '../libs/api.js';
import {User} from '../libs/users.js';

export default class menuModel {
    constructor(events) {
        this.localEvents = events;
        this.localEvents.getEvent('checkAuthorization', this.checkAuthorization.bind(this));
        this.localEvents.getEvent('signOut', this.onLogout.bind(this));
    }

    /**
     * Заканчиваем сессию пользователя
     */
    onLogout() {
        api.deleteSession();
        this.localEvents.callEvent('car', { isAuth: false, signout: true });
        User.removeUser();
    }

    /**
     * Проверяем пользователя - авторизован ли
     */
    checkAuthorization() {
        Network.doGet({ url: '/api/session' }).then(res => {
            if (res.status !== 200) {
                res.json()
                    .then(data => this.localEvents.callEvent('checkAuthorizationResponse', {
                        isAuthorized: false,
                        error: data.error
                    }));
            } else {
                this.localEvents.callEvent('checkAuthorizationResponse', {
                    isAuthorized: true,
                    online: navigator.onLine
                });
            }
        }).catch((error) => {
            this.localEvents.callEvent('checkAuthorizationResponse', {
                online: navigator.onLine,
                error
            });
        });
    }
}
