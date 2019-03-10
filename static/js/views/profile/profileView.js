import View from '../../libs/views.js';

export default class profileView extends View {
    constructor({ eventBus = {} }) {
        super('profile/profileView.tmpl', eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('checkAuthResponse', this._onCheckAuthResponse.bind(this));
        this.localEventBus.getEvent('loadUserResponse', this._onLoadUserResponse.bind(this));

        this.localEventBus.getEvent('changeEmailResponse', this._onChangeEmailResponse.bind(this));
        this.localEventBus.getEvent('changePasswordResponse', this._onChangePassResponse.bind(this));
        this.localEventBus.getEvent('changeAvatarResponse', this._onChangeAvatarResponse.bind(this));
        this.localEventBus.getEvent('changeAvatarSuccess', this._onChangeAvatarSuccess.bind(this));
        this.localEventBus.getEvent('submitEmailSuccess', this._onSubmitEmailSucces.bind(this));
        this.localEventBus.getEvent('submitPasswordSuccess', this._onSubmitPasswordSucces.bind(this));
    }

    render(root, data = {}) {
        super.render(root, data);
        this.localEventBus.callEvent('checkAuth');
    }

    _onChangeAvatarResponse (data) {
        if (data.error) {
            this._showElement(this._avatarUploaderWarning);
            this._avatarUploaderWarning.innerHTML = data.error;
        } else {
            this._hideElement(this._avatarUploaderWarning);
            this._avatarUploaderWarning.innerHTML = '';
        }
    }

    _onChangeAvatarSuccess (data) {
        if (!data.avatar) {
            console.log('No avatar');
            return;
        }

        // this._avatarUploaderWarning.classList.add('hidden');
        this._avatarUploaderWarning.innerHTML = '';

        this._avatar.src = data.avatar;
    }

    _onCheckAuthResponse (data = {}) {
        if (data.error || !data.isAuth) {
            this.localEventBus.callEvent('checkAuthError');
            return;
        }

        this.localEventBus.callEvent('loadUser', data);
    }

    _onLoadUserResponse (data = {}) {
        if (data.error || !data.user) {
            this.localEventBus.callEvent('checkAuthError');
            return;
        }

        super.render(null, data);

        this._initElements();
    }

    _initElements () {
        this._avatar = this.el.querySelector('.js-avatar');
        this._avatarUploader = this.el.querySelector('.js-upload-avatar');
        this._avatarUploaderWarning = this.el.querySelector('.js-warning-avatar');

        this._emailBlock = this.el.querySelector('.js-email-row');
        // this._emailEditButton = this._emailBlock.querySelector('button');
        this._emailField = this._emailBlock.querySelector('.js-email-field');

        this._emailFormWrapper = this.el.querySelector('.js-email-form');
        this._emailForm = this._emailFormWrapper.querySelector('form');
        this._emailWarning = this._emailFormWrapper.querySelector('.js-warning-email');

        this._emailSubmitButton = this._emailForm.querySelector('.js-button-submit');
        this._emailCancelButton = this._emailForm.querySelector('.js-button-cancel');
        this._emailInputEmailForm = this._emailForm.elements['email'];

        this._passwordBlock = this.el.querySelector('.js-password-row');
        this._passwordEditButton = this._passwordBlock.querySelector('button');

        this._passwordFormWrapper = this.el.querySelector('.js-password-form');
        this._passwordForm = this._passwordFormWrapper.querySelector('form');
        this._passWarning = this._passwordFormWrapper.querySelector('.js-warning-password');

        this._passwordSubmitButton = this._passwordForm.querySelector('.js-button-submit');
        this._passwordCancelButton = this._passwordForm.querySelector('.js-button-cancel');
        this._passwordInputPasswordForm = this._passwordForm.elements['password'];

        this._initElementsEvents();
        this._initEventBusEvents();
    }

    _initElementsEvents () {
        this._avatarUploader.addEventListener('change', () => {
            this.localEventBus.callEvent('changeAvatar', { avatar: this._avatarUploader.files[0] });
        });

        this._emailCancelButton.addEventListener('click', (ev) => {
            ev.preventDefault();
            this._hideElement(this._emailFormWrapper);
            this._showElement(this._emailBlock);
        });

        this._emailSubmitButton.addEventListener('click', (ev) => {
            ev.preventDefault();
            this.localEventBus.callEvent('submitEmail', { email: this._emailInputEmailForm.value });
        });

        this._passwordEditButton.addEventListener('click', () => {
            this._showElement(this._passwordFormWrapper);
            this._hideElement(this._passwordBlock);
        });
        this._passwordCancelButton.addEventListener('click', (ev) => {
            ev.preventDefault();
            this._hideElement(this._passwordFormWrapper);
            this._showElement(this._passwordBlock);
        });

        this._passwordSubmitButton.addEventListener('click', (ev) => {
            ev.preventDefault();
            this.localEventBus.callEvent('submitPassword', { pass: this._passwordInputPasswordForm.value });
        });
    }

    _initEventBusEvents () {
        this._emailInputEmailForm.addEventListener('input',
            this._onChangeEmail.bind(this, this._emailInputEmailForm));

        this._passwordInputPasswordForm.addEventListener('change',
            this._onChangePass.bind(this, this._passwordInputPasswordForm));
    }

    _onSubmitEmailSucces (data) {
        this._hideElement(this._emailFormWrapper);
        this._showElement(this._emailBlock);

        if (!data.email) {
            return;
        }

        this._emailField.innerHTML = data.email;
    }

    _onSubmitPasswordSucces (data) {
        this._hideElement(this._passwordFormWrapper);
        this._showElement(this._passwordBlock);
        this.data = data; //Временная заглушка
    }

    _onChangePass (passEl) {
        const pass = passEl.value;
        this.localEventBus.callEvent('changePassword', { pass });
    }

    _onChangeEmail (emailEl) {
        const email = emailEl.value;
        this.localEventBus.callEvent('changeEmail', { email });
    }

    _onChangePassResponse (data) {
        this._onChangeResponseTmpl(data.error, this._passwordInputPasswordForm, this._passWarning);
    }

    _onChangeEmailResponse (data) {
        this._onChangeResponseTmpl(data.error, this._emailInputEmailForm, this._emailWarning);
    }

    _onChangeResponseTmpl (error) {
        if (error) {
            return;
        }
    }
}