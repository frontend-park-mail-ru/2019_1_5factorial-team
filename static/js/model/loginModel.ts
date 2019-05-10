import api from '../libs/api';
import Validator from '../libs/validation';
import { OK_RESPONSE, OK_VALIDATE_EMAIL, OK_VALIDATE_LOGIN, OK_VALIDATE_PASSWORD } from '../components/constants';
import EventBus from '../libs/eventBus';

export default class loginModel {
    localEventBus: EventBus;
    constructor(eventBus: EventBus) {
        this.localEventBus = eventBus;
        this.localEventBus.getEvent('login', this.onLogin.bind(this));
        this.oauthLogin();
    }

    /**
     * Проверяем данные на логин
     * @param {*} data
     */
    onLogin(data: { loginOrEmail: string; pass: string; }) {
        const loginOrEmailData = data.loginOrEmail;
        const password = data.pass;
        const validateLoginOrEmail = Validator.validateLoginOrEmail(loginOrEmailData);

        if (validateLoginOrEmail !== OK_VALIDATE_EMAIL && validateLoginOrEmail !== OK_VALIDATE_LOGIN) {
            const response = {
                inputField: 'js-login-or-email',
                error: validateLoginOrEmail
            };
            this.localEventBus.callEvent('loginResponse', response);
            return;
        }

        const validatePassword = Validator.validatePassword(password);

        if (validatePassword !== OK_VALIDATE_PASSWORD) {
            const response = {
                inputField: 'js-password',
                error: validatePassword
            };
            this.localEventBus.callEvent('loginResponse', response);
            return;
        }

        api.login(loginOrEmailData, data.pass)
            .then((res) => {
                if (res.status === OK_RESPONSE) {
                    res.json().then((data: any) => this.localEventBus.callEvent('loginSuccess', data));
                } else {
                    res.json().then((data: any) => this.localEventBus.callEvent('loginResponse', data));
                }
            });
    }

    /**
     * Авторизация через сторонние сервисы
     */
    oauthLogin() {
        const params = new URLSearchParams(window.location.hash.slice(1));
        const token = params.get('access_token');
        const qparams = new URLSearchParams(window.location.search);
        const service = qparams.get('service') || 'vk';
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
