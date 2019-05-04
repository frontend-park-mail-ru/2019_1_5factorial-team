import View from '../../libs/views.js';
import template from './signUpView.tmpl.xml';

import {OK_VALIDATE_EMAIL, OK_VALIDATE_LOGIN, OK_VALIDATE_PASSWORD} from '../../components/constants';

export default class signUpView extends View {
    constructor({ eventBus = {} }) {
        super(template, eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('signupResponse', this.onSignupResponse.bind(this));
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
    }

    onSignupResponse(data, check = 0) {
        const elementEmail = document.getElementsByClassName('js-email')[0];
        const elementLogin = document.getElementsByClassName('js-login')[0];
        const elementPassword = document.getElementsByClassName('js-password')[0];

        const emailWarning = document.getElementsByClassName('js-warning-email')[0];
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
    }

    onSubmit() {
        // event.preventDefault();
        const email = this.form.elements['email'].value;
        const login = this.form.elements['login'].value;
        const pass = this.form.elements['password'].value;

        this.localEventBus.callEvent('signup', { email, login, pass });
    }
}
