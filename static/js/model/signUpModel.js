import api from '../libs/api.js';
import Validator from '../libs/validation.js';

export default class signUpModel {
    constructor(eventBus) {
        this.localEventBus = eventBus;
        this.localEventBus.getEvent('changeEmail', this.checkChangeEmail.bind(this));
        this.localEventBus.getEvent('changeLogin', this.checkChangeLogin.bind(this));
        this.localEventBus.getEvent('changePassword', this.checkChangePassword.bind(this));
        this.localEventBus.getEvent('signup', this.checkSignUp.bind(this));

        this.defaultInputVals = {
            pass: false,
            login: false,
            email: false
        };
    }

    /**
     * Проверка данных на регистрацию
     * @param {*} data
     */
    checkSignUp(data) {
        const isValid = Object.entries(this.defaultInputVals).reduce((res, el) => (res && el[1]), true);

        if (isValid) {
            api.signUp({
                email: data.email,
                login: data.login,
                password: data.pass
            }).then(resp => {
                if (resp.status === 200) {
                    api.login({loginOrEmail: data.login, password: data.pass})
                        .then(() => {
                            this.localEventBus.callEvent('signupSuccess', {});
                        });
                } else {
                    resp
                        .json()
                        .then(data => this.localEventBus.callEvent('signupResponse', data));
                }
            }).catch(err => {
                console.error(err.message);
            });
        } else {
            this.checkChangePassword(data);
            this.checkChangeEmail(data);
            this.checkChangeLogin(data);
        }
    }

    /**
     * Проверка данных на смену пароля
     * @param {*} data
     */
    checkChangePassword(data) {
        const pass = data.pass;
        const errPass = Validator.validatePassword(pass);
        if (!errPass) {
            this.defaultInputVals['pass'] = false;
            this.localEventBus.callEvent('changePasswordResponse', { error: errPass });
            return;
        }

        this.defaultInputVals['pass'] = true;
        this.localEventBus.callEvent('changePasswordResponse', {});
    }

    /**
     * Проверка данных на смену email
     * @param {*} data
     */
    checkChangeEmail(data) {
        const email = data.email;
        const errEmail = Validator.validateEmail(email);
        if (!errEmail) {
            this.defaultInputVals['email'] = false;
            this.localEventBus.callEvent('changeEmailResponse', { error: errEmail });
            return;
        }

        this.defaultInputVals['email'] = true;
        this.localEventBus.callEvent('changeEmailResponse', {});
    }

    /**
     * Проверка данных на смену логина
     * @param {*} data
     */
    checkChangeLogin(data) {
        const login = data.login;
        const errLogin = Validator.validateLogin(login);
        if (!errLogin) {
            this.defaultInputVals['login'] = false;
            this.localEventBus.callEvent('changeLoginResponse', { error: errLogin });
            return;
        }

        this.defaultInputVals['login'] = true;
        this.localEventBus.callEvent('changeLoginResponse', {});
    }
}
