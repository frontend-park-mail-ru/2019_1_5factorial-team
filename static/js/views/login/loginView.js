import View from '../../libs/views';
import template from './loginView.tmpl.xml';

import '../../components/userBlock/userblock.scss';
import '../../../css/form.scss';
import { OK_VALIDATE_LOGIN, OK_VALIDATE_PASSWORD, OK_VALIDATE_EMAIL, EMPTY_PASSWORD, EXPTY_LOGIN_OR_EMAIL } from '../../components/constants';

export default class loginView extends View {
    constructor(eventBus) {
        super(template, eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('loginResponse', this.onSubmitResponse.bind(this));
        this.localEventBus.getEvent('loginResponseError', this.onSubmitResponseError.bind(this));
        this.localEventBus.getEvent('loginOrEmailRTCheckResponse', this.loginOrEmailRTCheckResponse.bind(this));
        this.localEventBus.getEvent('passwRTCheckResponse', this.passwRTCheckResponse.bind(this));
        this.loginOrEmailValue = '';
        this.passwordValue = '';
    }

    onSubmitResponseError(res) {
        res.json().then((data) => {
            if (data.error === 'Wrong password or login') {
                this.passwordWarning.textContent = 'Wrong password or login';
                this.passwInput.classList.remove('valid');
                this.passwInput.classList.add('invalid');
    
                this.loginOrEmailWarning.textContent = 'Wrong password or login';
                this.loginOrEmailInput.classList.remove('valid');
                this.loginOrEmailInput.classList.add('invalid');
            }
        });
    }

    passwRTCheckResponse({response = ''}) {
        this.passwordValue = response;
        if (response !== EMPTY_PASSWORD && response !== OK_VALIDATE_PASSWORD) {
            this.passwordErrorWarning(response);
        }
        if (response === OK_VALIDATE_PASSWORD) {
            this.isPass = true;
            this.passwInput.classList.remove('invalid');
            this.passwInput.classList.add('valid');
            this.passwordWarning.classList.add('hide');
            this.passwordWarning.textContent = '';
        }
    }

    loginOrEmailRTCheckResponse({response = ''}) {
        this.loginOrEmailValue = response;
        if (response !== EXPTY_LOGIN_OR_EMAIL && (response !== OK_VALIDATE_EMAIL || response !== OK_VALIDATE_LOGIN)) {
            this.loginOrEmailErrorWarning(response);
        }
        if (response === OK_VALIDATE_EMAIL || response === OK_VALIDATE_LOGIN) {
            this.isEmail = true;
            this.loginOrEmailInput.classList.remove('invalid');
            this.loginOrEmailInput.classList.add('valid');
            this.loginOrEmailWarning.classList.add('hide');
            this.loginOrEmailWarning.textContent = '';
        }
    }

    render(root, data = {}) {
        super.render(root, data);
        const form = document.getElementsByClassName('js-login-form')[0];
        form.addEventListener('submit', this.onSubmit.bind(this, form));

        this.loginOrEmailInput = document.getElementsByClassName('js-login-or-email')[0];
        this.passwInput = document.getElementsByClassName('js-password')[0];

        this.passwordWarning = document.getElementsByClassName('js-warning-password')[0];
        this.loginOrEmailWarning = document.getElementsByClassName('js-warning-login-or-email')[0];

        this.loginOrEmailInput.addEventListener('change', this.loginOrEmailRTCheck.bind(this, this.loginOrEmailInput));
        this.passwInput.addEventListener('change', this.passwRTCheck.bind(this, this.passwInput));
        // return this;
    }

    loginOrEmailRTCheck(input) {
        this.localEventBus.callEvent('loginOrEmailRTCheck', {data: input.value});
    }

    passwRTCheck(input) {
        this.localEventBus.callEvent('passwRTCheck', {data: input.value});
    }

    onSubmit(form, event) {
        event.preventDefault();
        if (this.loginOrEmailValue !== OK_VALIDATE_LOGIN && this.passwordValue !== OK_VALIDATE_PASSWORD) {
            console.warn('Incorrect login or email!');
        } else {
            this.localEventBus.callEvent('login', {
                loginOrEmail: this.loginOrEmailInput.value, pass:this.passwInput.value
            });
        }
    }

    onSubmitResponse(data) {
        console.log(data);
    }

    loginOrEmailErrorWarning(data) {
        this.loginOrEmailWarning.textContent = data;
        this.loginOrEmailWarning.classList.remove('hide');
        this.loginOrEmailInput.classList.remove('valid');
        this.loginOrEmailInput.classList.add('invalid');
    }

    passwordErrorWarning(data) {
        this.passwordWarning.textContent = data;
        this.passwordWarning.classList.remove('hide');
        this.passwInput.classList.remove('valid');
        this.passwInput.classList.add('invalid');
    }
}
