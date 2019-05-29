import View from '../../libs/views';
import template from './signUpView.tmpl.xml';

import {OK_VALIDATE_EMAIL, OK_VALIDATE_LOGIN, OK_VALIDATE_PASSWORD, EMPTY_EMAIL, EMPTY_LOGIN, EMPTY_PASSWORD} from '../../components/constants';

import '../../components/userBlock/userblock.scss';
import '../../../css/form.scss';

export default class signUpView extends View {
    constructor(eventBus) {
        super(template, eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('signupResponse', this.onSignupResponse.bind(this));
        this.localEventBus.getEvent('loginRTCheckResponse', this.loginRTCheckResponse.bind(this));
        this.localEventBus.getEvent('emailRTCheckResponse', this.emailRTCheckResponse.bind(this));
        this.localEventBus.getEvent('passwRTCheckResponse', this.passwRTCheckResponse.bind(this));

        this.isPass = false;
        this.isLogin = false;
        this.isEmail = false;
    }

    passwRTCheckResponse({response = ''}) {
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

    emailRTCheckResponse({response = ''}) {
        if (response !== EMPTY_EMAIL && response !== OK_VALIDATE_EMAIL) {
            this.emailErrorWarning(response);
        }
        if (response === OK_VALIDATE_EMAIL) {
            this.isEmail = true;
            this.emailInput.classList.remove('invalid');
            this.emailInput.classList.add('valid');
            this.emailWarning.classList.add('hide');
            this.emailWarning.textContent = '';
        }
    }

    loginRTCheckResponse({response = ''}) {
        if (response !== EMPTY_LOGIN && response !== OK_VALIDATE_LOGIN) {
            this.loginErrorWarning(response);
        }
        if (response === OK_VALIDATE_LOGIN) {
            this.isLogin = true;
            this.loginInput.classList.remove('invalid');
            this.loginInput.classList.add('valid');
            this.loginWarning.classList.add('hide');
            this.loginWarning.textContent = '';
        }
    }

    render(root, data = {}) {
        super.render(root, data);

        this.form = document.getElementsByClassName('js-signup-form')[0];
        this.passwordInput = this.form.elements['password'];
        const submit = document.getElementsByClassName('js-submit')[0];
        submit.addEventListener('click', (event) => {
            event.preventDefault();
            this.onSubmit();
        });
        this.emailInput = document.getElementsByClassName('js-email')[0];
        this.loginInput = document.getElementsByClassName('js-login')[0];
        this.passwInput = document.getElementsByClassName('js-password')[0];

        this.emailInput.addEventListener('change', this.emailRTCheck.bind(this, this.emailInput));
        this.loginInput.addEventListener('change', this.loginRTCheck.bind(this, this.loginInput));
        this.passwInput.addEventListener('change', this.passwRTCheck.bind(this, this.passwInput));

        this.emailWarning = document.getElementsByClassName('js-warning-email')[0];
        this.loginWarning = document.getElementsByClassName('js-warning-login')[0];
        this.passwordWarning = document.getElementsByClassName('js-warning-password')[0];
        // return this;
    }

    emailRTCheck(input) {
        this.localEventBus.callEvent('emailRTCheck', {data: input.value});
    }
    
    loginRTCheck(input) {
        this.localEventBus.callEvent('loginRTCheck', {data: input.value});
    }

    passwRTCheck(input) {
        this.localEventBus.callEvent('passwRTCheck', {data: input.value});
    }

    onSignupResponse(data = {}, check = 0) {
        console.warn(data, check);
    }

    onSubmit() {
        const email = this.form.elements['email'].value;
        const login = this.form.elements['login'].value;
        const pass = this.form.elements['password'].value;

        if (this.isEmail && this.isLogin && this.isPass) {
            this.localEventBus.callEvent('signup', { email, login, pass });
        }
    }

    loginErrorWarning(data) {
        this.loginWarning.textContent = data;
        this.loginWarning.classList.remove('hide');
        this.loginInput.classList.remove('valid');
        this.loginInput.classList.add('invalid');
    }

    emailErrorWarning(data) {
        this.emailWarning.textContent = data;
        this.emailWarning.classList.remove('hide');
        this.emailInput.classList.remove('valid');
        this.emailInput.classList.add('invalid');
    }

    passwordErrorWarning(data) {
        this.passwordWarning.textContent = data;
        this.passwordWarning.classList.remove('hide');
        this.passwInput.classList.remove('valid');
        this.passwInput.classList.add('invalid');
    }
}
