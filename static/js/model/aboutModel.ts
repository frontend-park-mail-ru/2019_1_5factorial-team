import api from '../libs/api';
import {doGet} from '../libs/network';
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
    async checkAuthorization() {
        const res = await doGet({ url: '/api/session' });
        if ((res as Response).status === ANAUTH_RESPONSE) {
            return this.localEventBus.callEvent('checkAuthorizationResponse', {
                isAuthorized: false,
                statusText: (res as Response).statusText,
            });
        } else {
            return this.localEventBus.callEvent('checkAuthorizationResponse', {
                isAuthorized: true,
                statusText: (res as Response).statusText,
            });
        }
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
}
