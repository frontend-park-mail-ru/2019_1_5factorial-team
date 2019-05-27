import Network from '../libs/network';
import api from '../libs/api';
import {User} from '../libs/users';
import userBlock from '../components/userBlock/userBlock';
import { ANAUTH_RESPONSE } from '../components/constants';
import EventBus from '../libs/eventBus';

interface IResponseMenu extends Response {
    error?: string;
    nickname?: string;
}

export default class menuModel {
    localEventBus: EventBus;
    constructor(eventbus: EventBus) {
        this.localEventBus = eventbus;
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
        checkHeader.changeButtons('loggedOut');
        User.removeUser();
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
                });
            }
        });
    }
}
