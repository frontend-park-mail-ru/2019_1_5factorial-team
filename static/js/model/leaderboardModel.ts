import api from '../libs/api';
import {doGet} from '../libs/network';
import {User} from '../libs/users';
import userBlock from '../components/userBlock/userBlock';
import { ANAUTH_RESPONSE, OK_RESPONSE, COUNT_OF_PAGES, NUM_OF_POSITIONS } from '../components/constants';
import EventBus from '../libs/eventBus';
import Logger from '../libs/logger';

export default class leaderboardModel {
    localEventBus: EventBus;
    countOfPages: number;
    numOfPositions: number;
    sumOfUsers: number;
    logger: Logger;

    constructor(eventBus: EventBus, logger: Logger) {
        this.localEventBus = eventBus;
        this.logger = logger;
        
        this.localEventBus.getEvent('load', this.loadPage.bind(this));
        this.localEventBus.getEvent('loadPaginator', this.loadPaginator.bind(this));
        this.localEventBus.getEvent('checkAuthorization', this.checkAuthorization.bind(this));
        this.localEventBus.getEvent('signOut', this.onLogout.bind(this));

        this.countOfPages = COUNT_OF_PAGES;
        this.numOfPositions = NUM_OF_POSITIONS;
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

    /**
     * Заканчиваем сессию пользователя
     */
    onLogout() {
        api.deleteSession();
        const checkHeader = new userBlock();
        checkHeader.changeButtons('loggedOut');
        // this.localEventBus.callEvent('closeView', { isAuth: false, signout: true });
        User.removeUser();
    }

    /**
     * Подгружаем пагинацию
     */
    loadPaginator() {
        api.getUserCount()
            .then(resp => resp.json())
            .then(users => {
                if (users.count) {
                    this.sumOfUsers = users.count;
                    this.localEventBus.callEvent('loadPaginatorResponse', {
                        pagesCount: this.sumOfUsers / this.countOfPages,
                        linksCount: this.numOfPositions
                    });
                }
            });
    }

    /**
     * Загружаем страницы, которые необходимо пагинировать
     */
    loadPage({pageNum = 1} = {}) {
        api.getScore({
            limit: this.numOfPositions,
            offset: pageNum
        }).then(res => {
            if (res.status === OK_RESPONSE) {
                return res.json();
            }
            throw new Error('Can`t load scoreboard: ' + res.status);
        }).then(data => {
            this.localEventBus.callEvent('loadResponse', data.scores);
        }
        ).catch(err => {
            console.error(err);
            this.localEventBus.callEvent('loadResponse', {});
        });
    }
}
