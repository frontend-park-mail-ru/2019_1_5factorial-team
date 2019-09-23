import {doGet} from '../libs/network';
import api from '../libs/api';
import {User} from '../libs/users';
import userBlock from '../components/userBlock/userBlock';
import { ANAUTH_RESPONSE } from '../components/constants';
import EventBus from '../libs/eventBus';
import Logger from '../libs/logger';

export default class menuModel {
    localEventBus: EventBus;
    logger: Logger;
    
    constructor(eventbus: EventBus, logger: Logger) {
        this.localEventBus = eventbus;
        this.logger = logger;

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
    async checkAuthorization() {
        const res = await doGet({ url: '/api/session' });
        if (res.status === ANAUTH_RESPONSE) {
            return this.localEventBus.callEvent('checkAuthorizationResponse', {
                isAuthorized: false,
                statusText: res.statusText,
            });
        } else {
            return this.localEventBus.callEvent('checkAuthorizationResponse', {
                isAuthorized: true,
                statusText: res.statusText,
            });
        }
    }
}
