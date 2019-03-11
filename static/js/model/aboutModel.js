import api from '../libs/api.js';
import Network from '../libs/network.js';
import {User} from '../libs/users.js';

export default class aboutModel {
    constructor (eventBus) {
        this.localEventBus = eventBus;
        this.localEventBus.getEvent('checkAuthorization', this.checkAuthorization.bind(this));
        this.localEventBus.getEvent('signOut', this._onLogout.bind(this));
    }

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

    _onLogout() {
        api.deleteSession();
        this.localEventBus.callEvent('car', { isAuth: false, signout: true });
        User.removeUser();
    }
}