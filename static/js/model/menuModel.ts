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
        return Network.doGet({ url: '/api/session' }).then(res => {
        res.json().then((res: IResponseMenu) => {
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
    })   
    }
}
