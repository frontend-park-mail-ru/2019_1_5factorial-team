import View from '../../libs/views.js';
import { INCORRECT_EMAIL, TOO_SHORT_LOGIN, TOO_SHORT_PASSWORD } from '../../components/constants.js';
import template from './signUpView.tmpl.xml';

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
        this.form.addEventListener('submit', this.onSubmit.bind(this));
    }

    onSignupResponse(data) {
        console.log(data);
        const elementEmail = document.getElementsByClassName('js-email')[0];
        const elementLogin = document.getElementsByClassName('js-login')[0];
        const elementPassword = document.getElementsByClassName('js-password')[0];
        if (data.arrReturn[0] === INCORRECT_EMAIL) {
            elementEmail.classList.add('invalid');
        }
        if (data.arrReturn[1] === TOO_SHORT_LOGIN) {
            elementLogin.classList.add('invalid');
        }
        if (data.arrReturn[2] === TOO_SHORT_PASSWORD) {
            elementPassword.classList.add('invalid');
        }
    }

    onSubmit(event) {
        event.preventDefault();
        const email = this.form.elements['email'].value;
        const login = this.form.elements['login'].value;
        const pass = this.form.elements['password'].value;

        this.localEventBus.callEvent('signup', { email, login, pass });
    }
}
