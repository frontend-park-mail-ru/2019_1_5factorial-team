import api from '../libs/api.js';
import Network from '../libs/network.js';
import {User} from '../libs/users.js';

export default class leaderboardModel {
    constructor (eventBus) {
        this.localEventBus = eventBus;
        this.localEventBus.getEvent('load', this.loadPage.bind(this));
        this.localEventBus.getEvent('loadPaginator', this.loadPaginator.bind(this));
        this.localEventBus.getEvent('checkAuthorization', this.checkAuthorization.bind(this));
        this.localEventBus.getEvent('signOut', this._onLogout.bind(this));
        this.localEventBus.getEvent('loadUser', this._onLoadUser.bind(this));

        this.countOfPages = 4;
        this.numOfPositions = 5;
    }

    _onLogout() {
        api.deleteSession();
        this.localEventBus.callEvent('car', { isAuth: false, signout: true });
        User.removeUser();
    }

    checkAuthorization() {
        Network.doGet({url: '/api/session'})
            .then(response => {
                if (response.status !== 200) {
                    response.json().then(data => this.localEventBus.callEvent('checkAuthorizationResponse', {
                        isAuth: false,
                        error: data.error
                    }));
                } else {
                    response.json().then(data => {
                        this.localEventBus.callEvent('checkAuthorizationResponse', {
                            isAuth: true,
                            user_guid: data.user_guid
                        });
                    });
                }
            })
            .catch((error) => {
                this.localEventBus.callEvent('checkAuthorizationResponse', {error});
            });
    }

    _onLoadUser(data) {
        this._currentUserGUID = data.user_guid;
        console.log('onLoadUser data ', data);

        if (!User.checkUser()) {
            if (!this._currentUserGUID) {
                this.localEventBus.callEvent('loadUserResponse', {});
            }

            console.log(this._currentUserGUID);
            api.loadUser(this._currentUserGUID)
                .then(user => {
                    if (user.error) {
                        this.localEventBus.callEvent('loadUserResponse', {});
                    } else {
                        const toSetUser = {
                            avatar: (user.avatar === '' ? 'images/default-avatar.svg' : Network.getStorageURL() + user.avatar),
                            login: user.nickname || 'Nouserlogin',
                            guid: user.guid
                        };
                        User.setUser({ toSetUser });

                        this._currentUserGUID = user.guid;
                        this.localEventBus.callEvent('loadUserResponse', {user: toSetUser});
                    }
                });
        } else {
            this.localEventBus.callEvent('loadUserResponse', {user: {
                login: User.nickname,
                guid: User.guid,
                avatar: User.avatar
            }});
        }
    }

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
                    console.log(users.count);
                }
            });
    }

    //{ pageNum = 1 } = {}
    loadPage ({pageNum = 1} = {}) {
        this.localEventBus.callEvent('loadWaiting');
        api.getScore({
            limit: this.numOfPositions,
            offset: this.numOfPositions * (pageNum - 1)
            // offset: 1
        }).then(res => {
            if (res.status === 200) {
                return res.json();
            }
            throw new Error('Can`t load scoreboard: ' + res.status);
        }).then(data => {
            console.log('before callEvent ', data.scores);
            this.localEventBus.callEvent('loadResponse', data.scores);
        }
        ).catch(err => {
            console.error(err);
            this.localEventBus.callEvent('loadResponse', {});
        });
    }
}