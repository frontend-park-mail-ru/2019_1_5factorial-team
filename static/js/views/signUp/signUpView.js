import View from '../../libs/views.js';

export default class signUpView extends View {
    constructor({ eventBus = {} }) {
        super('signUp/signUpView.tmpl', eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('changeEmailResponse', this.onChangeEmailResponse.bind(this));
        this.localEventBus.getEvent('changeLoginResponse', this.onChangeLoginResponse.bind(this));
        this.localEventBus.getEvent('changePasswordResponse', this.onChangePassResponse.bind(this));
        this.localEventBus.getEvent('changePasswordRepeatResponse', this.onChangeRepassResponse.bind(this));
        this.localEventBus.getEvent('signupResponse', this.onSignupResponse.bind(this));
    }

    render(root, data = {}) {
        super.render(root, data);

        this.form = document.querySelector('.form');

        this.passwordInput = this.form.elements['password'];
        this.passwordInput.addEventListener('change', this.onChangePass.bind(this, this.passwordInput));

        this.form.addEventListener('submit', this.onSubmit.bind(this));
    }

    onSignupResponse (data) {
        const field = data.field;
        const error = data.error;
        console.log(error);

        switch (field) {
            case 'password':
                this.onChangePassResponse(data);
                break;
            default:
                console.error('Undefined field:' + field);
                break;
        }
    }

    onChangeRepassResponse (data) {
        this.onChangeResponseTmpl(data.error, this.repasswordInput, this.repassWarning);
    }

    onChangePassResponse (data) {
        this.onChangeResponseTmpl(data.error, this.passwordInput, this.passWarning);
    }

    onChangeEmailResponse (data) {
        this.onChangeResponseTmpl(data.error, this.emailInput, this.emailWarning);
    }

    onChangeLoginResponse (data) {
        this.onChangeResponseTmpl(data.error, this.loginInput, this.loginWarning);
    }

    onChangeResponseTmpl (error) {
        if (error) {
            return;
        }
    }

    onChangePass (passEl) {
        const pass = passEl.value;
        this.localEventBus.callEvent('changePassword', { pass });
    }


    onSubmit (ev) {
        ev.preventDefault();
        const email = this.form.elements['email'].value;
        const login = this.form.elements['login'].value;
        const pass = this.form.elements['password'].value;

        this.localEventBus.callEvent('signup', { email, login, pass });
    }
}
