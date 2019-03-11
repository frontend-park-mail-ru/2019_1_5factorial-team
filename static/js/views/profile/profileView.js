import View from '../../libs/views.js';

export default class profileView extends View {
    constructor({ eventBus = {} }) {
        super('profile/profileView.tmpl', eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('checkAuthResponse', this._onCheckAuthResponse.bind(this));
        this.localEventBus.getEvent('loadUserResponse', this._onLoadUserResponse.bind(this));

        // this.localEventBus.getEvent('changeEmailResponse', this._onChangeEmailResponse.bind(this));
        this.localEventBus.getEvent('changePasswordResponse', this._onChangePassResponse.bind(this));
        this.localEventBus.getEvent('changeAvatarResponse', this._onChangeAvatarResponse.bind(this));
        this.localEventBus.getEvent('changeAvatarSuccess', this._onChangeAvatarSuccess.bind(this));
        // this.localEventBus.getEvent('submitEmailSuccess', this._onSubmitEmailSucces.bind(this));
        this.localEventBus.getEvent('submitPasswordSuccess', this._onSubmitPasswordSuccess.bind(this));
    }

    render(root, data = {}) {
        super.render(root, data);
        this.localEventBus.callEvent('checkAuth');
    }

    _onSubmitPasswordSuccess(data) {
        this._onChangeResponseTmpl(data.error, this._passwordInputPasswordForm, this._passWarning);
    }

    _onChangePassResponse(data) {
        this._onChangeResponseTmpl(data.error, this._emailInputEmailForm, this._emailWarning);
    }

    _onChangeAvatarResponse () {

    }

    _onChangeAvatarSuccess (data) {
        if (!data.avatar) {
            console.log('No avatar');
            return;
        }

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
        console.log('data is ', data);
        super.render(null, data);
        const imgTemp = document.querySelector('.avatar-img');
        console.log('avatar is ', data.avatar);
        imgTemp.src = data.user.avatar;

        this._initElements();
    }

    _initElements () {
        this._avatar = this.element.querySelector('.avatar-img');
        this._avatarUploader = document.querySelector('.js-change-image');
        this._avatarUploaderWarning = this.element.querySelector('.js-warning-avatar');
        this.loginText = document.querySelector('.js-login-row');

        this.formInput =  document.querySelector('.js-change-password');
        console.log(this.formInput);

        this.passwordSubmit = this.formInput.querySelector('.js-button-submit');
        console.log(this.formInput);
        this.imputPasswordOld = this.formInput.getElementsByClassName('js-password-old')[0];
        this.imputPasswordNew = this.formInput.getElementsByClassName('js-password-new')[0];
        console.log(this.imputPassword);

        this._emailBlock = document.querySelector('.js-email-subblock');
        // this._emailEditButton = this._emailBlock.querySelector('button');
        this._emailField = this._emailBlock.querySelector('.js-email-row');

        this._emailFormWrapper = this.element.querySelector('.js-email-form');

        this._passwordBlock = this.element.querySelector('.js-password-row');

        this._initElementsEvents();
    }

    _initElementsEvents () {
        const signoutButton = document.querySelector('.js-signout');
        this._avatarUploader.addEventListener('change', () => {
            this.localEventBus.callEvent('changeAvatar', { avatar: this._avatarUploader.files[0] });
        });

        signoutButton.addEventListener('click', () => {
            this.localEventBus.callEvent('sout');
        });

        this.passwordSubmit.addEventListener('click', (ev) => {
            ev.preventDefault();
            console.log({ oldPassword: this.imputPasswordOld.value, newPassword: this.imputPasswordNew.value});
            this.localEventBus.callEvent('submitPassword', { newPassword: this.imputPasswordNew.value, oldPassword: this.imputPasswordOld.value });
        });
    }

    _onChangeResponseTmpl (error) {
        if (error) {
            return;
        }
    }
}