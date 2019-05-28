import api from '../libs/api';
import Validator from '../libs/validation';
import { OK_RESPONSE, OK_VALIDATE_EMAIL, OK_VALIDATE_LOGIN, OK_VALIDATE_PASSWORD } from '../components/constants';
import EventBus from '../libs/eventBus';

export default class loginModel {
    localEventBus: EventBus;
    constructor(eventBus: EventBus) {
        this.localEventBus = eventBus;
        this.localEventBus.getEvent('login', this.onLogin.bind(this));
        this.localEventBus.getEvent('loginOrEmailRTCheck', this.loginOrEmailRTCheckResponse.bind(this));
        this.localEventBus.getEvent('passwRTCheck', this.passwRTCheck.bind(this));
        this.localEventBus.getEvent('oauthCheck', this.oauthLogin.bind(this));
        // this.oauthLogin();
    }

    loginOrEmailRTCheckResponse(input: {data: string}) {
        let response =  Validator.validateLoginOrEmail(input.data);
        this.localEventBus.callEvent('loginOrEmailRTCheckResponse', {response});
    }

    passwRTCheck(input: {data: string}) {
        let response =  Validator.validatePassword(input.data);
        return this.localEventBus.callEvent('passwRTCheckResponse', {response});
    }

    /**
     * Проверяем данные на логин
     * @param {*} data
     */
    onLogin(data: { loginOrEmail: string; pass: string; }) {
        api.login(data.loginOrEmail, data.pass)
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
