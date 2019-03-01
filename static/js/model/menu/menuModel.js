import Network from '../../libs/network.js';

export default class menuModel {
  constructor(eventBus) {
    this._eventBus = eventBus;
    this._eventBus.subscribeToEvent('checkAuth', this._onCheckAuth.bind(this));
  }

  _onCheckAuth() {
    Network.doGet({ url: '/api/session' })
      .then((response) => {
        if (response.status !== 200) {
          response.json().then(data => this._eventBus.triggerEvent('checkAuthResponse', {
            isAuth: false,
            error: data.error,
          }));
        } else {
          this._eventBus.triggerEvent('checkAuthResponse', {
            isAuth: true,
          });
        }
      })
      .catch((error) => {
        this._eventBus.triggerEvent('checkAuthResponse', {
          online: navigator.onLine,
          error,
        });
      });
  }
}
