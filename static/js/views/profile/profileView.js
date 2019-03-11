import View from '../../libs/views.js';

export default class profileView extends View {
    constructor({ eventBus = {} }) {
        super('profile/profileView.tmpl', eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('checkAuthResponse', this._onCheckAuthResponse.bind(this));
        this.localEventBus.getEvent('loadUserResponse', this._onLoadUserResponse.bind(this));

        this.localEventBus.getEvent('changePasswordResponse', this._onChangePassResponse.bind(this));
        this.localEventBus.getEvent('changeAvatarResponse', this._onChangeAvatarResponse.bind(this));
        this.localEventBus.getEvent('changeAvatarSuccess', this._onChangeAvatarSuccess.bind(this));
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
        super.render(null, data);
        const imgTemp = document.querySelector('.avatar-img');
        imgTemp.src = data.user.avatar;

        this._initElements();
    }

    _initElements () {
        this._avatar = document.querySelector('.avatar-img');
        this._avatarUploader = document.querySelector('.js-change-image');

        this.formInput =  document.querySelector('.js-change-password');

        this.passwordSubmit = this.formInput.querySelector('.js-button-submit');
        this.imputPasswordOld = this.formInput.getElementsByClassName('js-password-old')[0];
        this.imputPasswordNew = this.formInput.getElementsByClassName('js-password-new')[0];

        this._initElementsEvents();
    }

    _initElementsEvents () {
        const signoutButton = document.querySelector('.js-signout');
        const buttonUp = this._avatarUploader;
        buttonUp.addEventListener('change', () => {
            this.localEventBus.callEvent('changeAvatar', { avatar: this._avatarUploader.files[0] });
        });

        signoutButton.addEventListener('click', () => {
            this.localEventBus.callEvent('sout');
        });

        this.passwordSubmit.addEventListener('click', (ev) => {
            ev.preventDefault();
            this.localEventBus.callEvent('submitPassword', { newPassword: this.imputPasswordNew.value, oldPassword: this.imputPasswordOld.value });
        });
    }

    _onChangeResponseTmpl (error) {
        if (error) {
            return;
        }
    }
}
