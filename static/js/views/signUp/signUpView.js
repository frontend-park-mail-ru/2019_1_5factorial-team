import View from '../../libs/views.js';

export default class signUpView extends View {
    constructor({ eventBus = {} }) {
        super('signUpView.tmpl', eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('changeEmailResponse', this._onChangeEmailResponse.bind(this));
        this.localEventBus.getEvent('changeLoginResponse', this._onChangeLoginResponse.bind(this));
        this.localEventBus.getEvent('changePasswordResponse', this._onChangePassResponse.bind(this));
        this.localEventBus.getEvent('changePasswordRepeatResponse', this._onChangeRepassResponse.bind(this));
        this.localEventBus.getEvent('signupResponse', this._onSignupResponse.bind(this));
    }

    render(root, data = {}) {
        super.render(root, data);

        this.form = document.querySelector('.form');

        this.emailInput = this.form.elements['email'];
        this.emailInput.addEventListener('change', this._onChangeEmail.bind(this, this.emailInput));

        this.loginInput = this.form.elements['login'];
        this.loginInput.addEventListener('change', this._onChangeLogin.bind(this, this.loginInput));

        this.passwordInput = this.form.elements['password'];
        this.repasswordInput = this.form.elements['password-repeat'];

        this.passwordInput.addEventListener('change', this._onChangePass.bind(this, this.passwordInput, this.repasswordInput));
        this.repasswordInput.addEventListener('change', this._onChangeRepass.bind(this, this.repasswordInput, this.passwordInput));

        this.emailWarning = this.element.querySelector('.js-warning-email');
        this.loginWarning = this.element.querySelector('.js-warning-login');
        this.passWarning = this.element.querySelector('.js-warning-password');
        this.repassWarning = this.element.querySelector('.js-warning-repassword');

        this.form.addEventListener('submit', this._onSubmit.bind(this));
    }

    _onSignupResponse (data) {
        const field = data.field;

        switch (field) {
            case 'email':
                this._onChangeEmailResponse(data);
                break;
            case 'login':
                this._onChangeLoginResponse(data);
                break;
            case 'password':
                this._onChangePassResponse(data);
                break;
            default:
                console.error('Undefined field:' + field);
                break;
        }
    }

    _onChangeRepassResponse (data) {
        this._onChangeResponseTmpl(data.error, this.repasswordInput, this.repassWarning);
    }

    _onChangePassResponse (data) {
        this._onChangeResponseTmpl(data.error, this.passwordInput, this.passWarning);
    }

    _onChangeEmailResponse (data) {
        this._onChangeResponseTmpl(data.error, this.emailInput, this.emailWarning);
    }

    _onChangeLoginResponse (data) {
        this._onChangeResponseTmpl(data.error, this.loginInput, this.loginWarning);
    }

    _onChangeResponseTmpl (error, el, warning) {
        if (error) {
            signUpView.showWarning(el, warning, error);
            return;
        }

        signUpView._clearWarning(el, warning);
    }

    _onChangeRepass (repassEl, passEl) {
        const repass = repassEl.value;
        const pass = passEl.value;
        this.localEventBus.callEvent('changePasswordRepeat', { repass, pass });
    }

    _onChangePass (passEl, repassEl) {
        const pass = passEl.value;
        const repass = repassEl.value;
        this.localEventBus.callEvent('changePassword', { pass, repass });
    }

    _onChangeEmail (emailInput) {
        const email = emailInput.value;
        this.localEventBus.callEvent('changeEmail', { email });
    }

    _onChangeLogin (loginInput) {
        const login = loginInput.value;
        this.localEventBus.callEvent('changeLogin', { login });
    }


    _onSubmit (ev) {
        ev.preventDefault();
        const email = this.form.elements['email'].value;
        const login = this.form.elements['login'].value;
        const pass = this.form.elements['password'].value;
        const repass = this.form.elements['password-repeat'].value;

        this.localEventBus.callEvent('signup', { email, login, pass, repass });
    }
}
