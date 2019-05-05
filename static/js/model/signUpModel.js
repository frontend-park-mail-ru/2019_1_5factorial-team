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
        let arrReturn = new Array();
        arrReturn.length = 3;
        let check = 0;
        if (validateEmail !== OK_VALIDATE_EMAIL) {
            arrReturn[0] = validateEmail;
            check++;
        } else {
            arrReturn[0] = OK_VALIDATE_EMAIL;
        }

        if (validateLogin !== OK_VALIDATE_LOGIN) {
            arrReturn[1] = validateLogin;
            check++;
        } else {
            arrReturn[1] = OK_VALIDATE_LOGIN;
        }

        if (validatePassword !== OK_VALIDATE_PASSWORD) {
            arrReturn[2] = validatePassword;
            check++;
        } else {
            arrReturn[2] = OK_VALIDATE_PASSWORD;
        }

        if (check > 0) {
            this.localEventBus.callEvent('signupResponse', {arrReturn, check});
            return;
        }

        console.log(data);
        
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
