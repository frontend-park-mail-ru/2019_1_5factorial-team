import api from '../libs/api';
import Validator from '../libs/validation';
import { OK_RESPONSE, OK_VALIDATE_LOGIN, OK_VALIDATE_EMAIL, OK_VALIDATE_PASSWORD } from '../components/constants';
import EventBus from '../libs/eventBus';

export default class signUpModel {
    localEventBus: EventBus;
    constructor(eventBus: EventBus) {
        this.localEventBus = eventBus;
        this.localEventBus.getEvent('signup', this.SignUp.bind(this));
        this.localEventBus.getEvent('loginRTCheck', this.loginRTCheck.bind(this));
        this.localEventBus.getEvent('emailRTCheck', this.emailRTCheck.bind(this));
        this.localEventBus.getEvent('passwRTCheck', this.passwRTCheck.bind(this));
    }

    loginRTCheck(input: {data: string}) {
        let response =  Validator.validateLogin(input.data);
        this.localEventBus.callEvent('loginRTCheckResponse', {response});
    }

    emailRTCheck(input: {data: string}) {
        let response =  Validator.validateEmail(input.data);
        return this.localEventBus.callEvent('emailRTCheckResponse', {response});
    }

    passwRTCheck(input: {data: string}) {
        let response =  Validator.validatePassword(input.data);
        return this.localEventBus.callEvent('passwRTCheckResponse', {response});
    }

    /**
     * Проверка данных на регистрацию
     * @param {*} data
     */
    SignUp(data: {email: string, login: string, pass: string, avatarLink: string}) {
        api.signUp(data.login, data.email, data.pass, '/' + data.avatarLink)
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
