import Network from '../libs/network';
import api from '../libs/api';
import {User} from '../libs/users';
import userBlock from '../components/userBlock/userBlock';
import { ANAUTH_RESPONSE } from '../components/constants';
import EventBus from '../libs/eventBus';

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
        const checkHeader = new userBlock();
        checkHeader.changeButtons('loggedOut');
        User.removeUser();
    }

    /**
     * Проверяем пользователя - авторизован ли
     */
    checkAuthorization() {
        const res = Network.doGet({ url: '/api/session' });
        res.then((resp) => {
            if (resp.status === ANAUTH_RESPONSE) {
                console.log(resp);
                return this.localEventBus.callEvent('checkAuthorizationResponse', {
                    isAuthorized: false,
                    statusText: resp.statusText,
                });
            } else {
                console.log(resp);
                return this.localEventBus.callEvent('checkAuthorizationResponse', {
                    isAuthorized: true,
                    statusText: resp.statusText,
                });
            }
        })
    }
}
