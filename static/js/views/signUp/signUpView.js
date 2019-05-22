import View from '../../libs/views';
import template from './signUpView.tmpl.xml';

import {OK_VALIDATE_EMAIL, OK_VALIDATE_LOGIN, OK_VALIDATE_PASSWORD} from '../../components/constants';

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
    }

    passwRTCheckResponse({response = ''}) {
        console.log(`passwRTCheckResponse ${response}`);
    }

    emailRTCheckResponse({response = ''}) {
        console.log(`emailRTCheckResponse ${response}`);
    }

    loginRTCheckResponse({response = ''}) {
        console.log(`loginRTCheckResponse ${response}`);
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
        const elementEmail = document.getElementsByClassName('js-email')[0];
        const elementLogin = document.getElementsByClassName('js-login')[0];
        const elementPassword = document.getElementsByClassName('js-password')[0];

        const emailWarning = document.getElementsByClassName('js-warning-email')[0];
        const loginWarning = document.getElementsByClassName('js-warning-login')[0];
        if (check !== 0) {
            if (data.arrReturn[0] !== OK_VALIDATE_EMAIL) {
                emailWarning.classList.remove('hide');
                elementEmail.classList.remove('valid');
                elementEmail.classList.add('invalid');
                emailWarning.innerHTML = data.arrReturn[0];
            } else {
                elementEmail.classList.remove('invalid');
                elementEmail.classList.add('valid');
                emailWarning.classList.add('hide');
            }

            const loginWarning = document.getElementsByClassName('js-warning-login')[0];
            if (data.arrReturn[1] !== OK_VALIDATE_LOGIN) {
                loginWarning.classList.remove('hide');
                elementLogin.classList.remove('valid');
                elementLogin.classList.add('invalid');
                loginWarning.innerHTML = data.arrReturn[1];
            } else {
                elementLogin.classList.remove('invalid');
                elementLogin.classList.add('valid');
                loginWarning.classList.add('hide');
            }

            const passwordWarning = document.getElementsByClassName('js-warning-password')[0];
            if (data.arrReturn[2] !== OK_VALIDATE_PASSWORD) {
                passwordWarning.classList.remove('hide');
                elementPassword.classList.remove('valid');
                elementPassword.classList.add('invalid');
                passwordWarning.innerHTML = data.arrReturn[2];
            } else {
                elementPassword.classList.remove('invalid');
                elementPassword.classList.add('valid');
                passwordWarning.classList.add('hide');
            }
        }
        if (data.error === 'email conflict') {
            emailWarning.textContent = 'This email is used!';
        } else if (data.error === 'login conflict') {
            loginWarning.textContent = 'This login is used!';
        } else {
            loginWarning.textContent = 'Server is not OLLO';
        }
    }

    onSubmit() {
        const email = this.form.elements['email'].value;
        const login = this.form.elements['login'].value;
        const pass = this.form.elements['password'].value;

        this.localEventBus.callEvent('signup', { email, login, pass });
    }
}
