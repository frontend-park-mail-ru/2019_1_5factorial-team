import View from '../../libs/views.js';

export default class signUpView extends View {
    constructor({ eventBus = {} }) {
        super('signUp/signUpView.tmpl', eventBus);
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

        this.passwordInput.addEventListener('change', this._onChangePass.bind(this, this.passwordInput));

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
    }

    _onChangePass (passEl) {
        const pass = passEl.value;
        this.localEventBus.callEvent('changePassword', { pass });
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
        console.log('_onsubmit method in view');
        const email = this.form.elements['email'].value;
        const login = this.form.elements['login'].value;
        const pass = this.form.elements['password'].value;

        this.localEventBus.callEvent('signup', { email, login, pass });
    }
}
