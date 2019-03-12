import api from '../libs/api.js';
import Network from '../libs/network.js';
import {User} from '../libs/users.js';

export default class leaderboardModel {
    constructor (eventBus) {
        this.localEventBus = eventBus;
        this.localEventBus.getEvent('load', this.loadPage.bind(this));
        this.localEventBus.getEvent('loadPaginator', this.loadPaginator.bind(this));
        this.localEventBus.getEvent('checkAuthorization', this.checkAuthorization.bind(this));
        this.localEventBus.getEvent('signOut', this.onLogout.bind(this));

        this.countOfPages = 5;
        this.numOfPositions = 5;
    }

    /**
     * Проверяем пользователя - авторизован ли
     */
    checkAuthorization() {
        Network.doGet({ url: '/api/session' }).then(res => {
            if (res.status !== 200) {
                res.json()
                    .then(data => this.localEventBus.callEvent('checkAuthorizationResponse', {
                        isAuthorized: false,
                        error: data.error
                    }));
            } else {
                this.localEventBus.callEvent('checkAuthorizationResponse', {
                    isAuthorized: true,
                    online: navigator.onLine
                });
            }
        }).catch((error) => {
            this.localEventBus.callEvent('checkAuthorizationResponse', {
                online: navigator.onLine,
                error
            });
        });
    }

    /**
     * Заканчиваем сессию пользователя
     */
    onLogout() {
        api.deleteSession();
        this.localEventBus.callEvent('car', { isAuth: false, signout: true });
        User.removeUser();
    }

    /**
     * Подгружаем пагинацию
     */
    loadPaginator () {
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
    loadPage ({pageNum = 1} = {}) {
        this.localEventBus.callEvent('loadWaiting');
        api.getScore({
            limit: this.numOfPositions,
            offset: pageNum
        }).then(res => {
            if (res.status === 200) {
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
