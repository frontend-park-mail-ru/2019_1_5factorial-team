import api from '../libs/api.js';
import Validator from '../libs/validation.js';
import { OK_RESPONSE, OK_VALIDATE_LOGIN, OK_VALIDATE_EMAIL, OK_VALIDATE_PASSWORD } from '../components/constants.js';

export default class signUpModel {
    constructor(eventBus) {
        this.localEventBus = eventBus;
        this.localEventBus.getEvent('signup', this.checkSignUp.bind(this));
    }

    /**
     * Проверка данных на регистрацию
     * @param {*} data
     */
    checkSignUp(data) {
        const validateEmail = Validator.validateEmail(data.email);
        const validateLogin = Validator.validateLogin(data.login);
        const validatePassword = Validator.validatePassword(data.pass);
        if (validateEmail !== OK_VALIDATE_EMAIL) {
            this.localEventBus.callEvent('signupResponse', validateEmail);
            return;
        }
        if (validateLogin !== OK_VALIDATE_LOGIN) {
            this.localEventBus.callEvent('signupResponse', validateLogin);
            return;
        }
        if (validatePassword !== OK_VALIDATE_PASSWORD) {
            this.localEventBus.callEvent('signupResponse', validatePassword);
            return;
        }
        api.signUp({
            email: data.email,
            login: data.login,
            password: data.pass
        }).then(resp => {
            if (resp.status === OK_RESPONSE) {
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
    }
}
