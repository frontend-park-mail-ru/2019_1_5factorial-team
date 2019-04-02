import api from '../libs/api.js';
import Validator from '../libs/validation.js';

const OK_RESPONSE = 200;

export default class loginModel {
    constructor(eventBus) {
        this.localEventBus = eventBus;
        this._oauthLogin();
        this.localEventBus.getEvent('login', this.onLogin.bind(this));
    }

    /**
     * Проверяем данные на логин
     * @param {*} data
     */
    onLogin(data) {
        const loginOrEmailData = data.loginOrEmail;
        const password = data.pass;
        const validateLoginOrEmail = Validator.validateLoginOrEmail(loginOrEmailData);

        if (!validateLoginOrEmail) {
            const response = {
                inputField: 'loginOrEmail',
                error: validateLoginOrEmail
            };
            this.localEventBus.callEvent('loginResponse', response);
            return;
        }

        const validatePassword = Validator.validatePassword(password);

        if (!validatePassword) {
            const response = {
                inputField: 'inputPassword',
                error: validatePassword
            };
            this.localEventBus.callEvent('loginResponse', response);
            return;
        }

        this.localEventBus.callEvent('loadWaiting');

        api.login({
            loginOrEmail: loginOrEmailData,
            password: data.pass
        }).then(res => {
            if (res.status === OK_RESPONSE) {
                res.json().then(data => this.localEventBus.callEvent('loginSuccess', data));
            } else {
                res.json().then(data => this.localEventBus.callEvent('loginResponse', data));
            }
        });
    }

    _oauthLogin() {
        const params = new URLSearchParams(window.location.hash.slice(1));
        const token = params.get('access_token');
        const qparams = new URLSearchParams(window.location.search);
        let service = qparams.get('service');
        service = service ? service : 'vk';

        if (token) {
            api.loginOauth({
                token,
                service
            }).then(res => {
                if (res.status === OK_RESPONSE) {
                    res.json().then(data => this.localEventBus.callEvent('loginSuccess', data));
                } else {
                    res.json().then(data => this.localEventBus.callEvent('loginResponse', data));
                }
            });
        }
    }

}
