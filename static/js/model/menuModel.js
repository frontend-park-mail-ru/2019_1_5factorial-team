import Network from '../libs/network.js';

export default class menuModel {
    constructor(events) {
        this.localEvents = events;
        this.localEvents.getEvent('checkAuthorization', this.checkAuthorization.bind(this));
    }

    checkAuthorization() {
        Network.Get({ url: 'api/session' }).then(res => {
            if (res.status !== 200) {
                res.json().then(data => this.localEvents.callEvent('checkAuthorizationResponse', {
                    isAuthorized: false,
                    error: data.error
                }));
            } else {
                this.localEvents.callEvent('checkAuthorizationResponse', {
                    online: navigator.onLine
                });
            }
        }).catch((error) => {
            this.localEvents.callEvent('checkAuthorizationResponse', {
                online: navigator.onLine,
                error
            });
        });
    }
}