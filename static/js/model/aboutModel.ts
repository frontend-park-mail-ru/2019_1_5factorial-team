import api from '../libs/api';
import Network from '../libs/network';
import {User} from '../libs/users';
import userBlock from '../components/userBlock/userBlock';
import { ANAUTH_RESPONSE } from '../components/constants';
import EventBus from '../libs/eventBus';

export default class aboutModel {
    localEventBus: EventBus;
    constructor(eventBus: EventBus) {
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
                res.json().then(data => {
                    this.localEventBus.callEvent('checkAuthorizationResponse', {
                    isAuthorized: false,
                    statusText: data.statusText,
                    error: data.error
                })
            });
            } else {
                this.localEventBus.callEvent('checkAuthorizationResponse', {
                    isAuthorized: true,
                    statusText: res.statusText,
                });
            }
        });
    }

    /**
     * Заканчиваем сессию пользователя
     */
    onLogout() {
        api.deleteSession();
        const checkHeader = new userBlock();
        checkHeader.changeButtons('loggedOut');
        this.localEventBus.callEvent('closeView', { isAuth: false, signout: true });
        User.removeUser();
    }
}
