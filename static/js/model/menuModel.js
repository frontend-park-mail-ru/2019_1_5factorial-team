import Network from '../libs/network.js';

export default class menuModel {
    constructor(eventBus) {
        this.localEventBus = eventBus;
        this.localEventBus.getEvent('checkAuthorization', this.checkAuthorization.bind(this));
    }

    checkAuthorization() {
        Network.Get({ url: 'api/session' }).then(res => {
            if (res.status !== 200) {
                res.json().then(data => this.localEventBus.callEvent('checkAuthorizationResponse', {
                    isAuthorized: false,
                    error: data.error
                }));
            } else {
                this.localEventBus.callEvent('checkAuthorizationResponse', {
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
}