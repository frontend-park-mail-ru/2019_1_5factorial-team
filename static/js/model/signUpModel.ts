import api from '../libs/api';
import Validator from '../libs/validation';
import { OK_RESPONSE, OK_VALIDATE_LOGIN, OK_VALIDATE_EMAIL, OK_VALIDATE_PASSWORD } from '../components/constants';
import EventBus from '../libs/eventBus';

export default class signUpModel {
    localEventBus: EventBus;
    constructor(eventBus: EventBus) {
        this.localEventBus = eventBus;
        this.localEventBus.getEvent('signup', this.checkSignUp.bind(this));
    }

    /**
     * Проверка данных на регистрацию
     * @param {*} data
     */
    checkSignUp(data: {email: string, login: string, pass: string}) {
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
        
        api.signUp(data.login, data.email, data.pass)
            .then(resp => {
                if (resp.status === OK_RESPONSE) {
                    api.login(data.login, data.pass)
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
