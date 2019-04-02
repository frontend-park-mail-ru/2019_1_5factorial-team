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
        switch (data) {
            case INCORRECT_EMAIL: {
                const element = document.getElementsByClassName('js-email')[0];
                element.classList.add('invalid');
                break;
            }
            case TOO_SHORT_LOGIN: {
                const element = document.getElementsByClassName('js-login')[0];
                element.classList.add('invalid');
                break;
            }
            case TOO_SHORT_PASSWORD: {
                const element = document.getElementsByClassName('js-password')[0];
                element.classList.add('invalid');
                break;
            }
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
