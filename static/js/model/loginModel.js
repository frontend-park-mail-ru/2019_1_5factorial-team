import api from '../libs/api.js';
import Validator from '../libs/validation.js';

export default class loginModel {
    constructor(eventBus) {
        this.localEventBus = eventBus;
        this.localEventBus.getEvent('login', this.onLogin.bind(this));
    }

    onLogin(data) {
        const loginOrEmailData = data.loginOrEmail;
        const password = data.Password;
        const validate = new Validator();
        const validateLoginOrEmail = validate.validateLoginOrEmail(loginOrEmailData);

        if (!validateLoginOrEmail) {
            const response = {
                inputField: 'loginOrEmail',
                error: validateLoginOrEmail
            };
            this.localEventBus.callEvent('loginResponse', response);
            return;
        }

        const validatePassword = validate.validatePassword(password);

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
            loginOrEmailData,
            password: data.Password
        }).then(res => {
            if (res.status === 200) {
                res.json().then(data => this.localEventBus.callEvent('loginSuccess', data));
            } else {
                res.json().then(data => this.localEventBus.callEvent('loginResponse', data));
            }
        });
    }
}