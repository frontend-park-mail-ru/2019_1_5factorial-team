import View from '../../libs/views.js';

export default class profileView extends View {
    constructor({ eventBus = {} }) {
        super('profile/profileView.tmpl', eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('checkAuthResponse', this.onCheckAuthorizationResponse.bind(this));
        this.localEventBus.getEvent('loadUserResponse', this.onLoadUserResponse.bind(this));

        this.localEventBus.getEvent('changePasswordResponse', this.onChangePasswodResponse.bind(this));
        this.localEventBus.getEvent('changeAvatarResponse', this.onChangeAvatarResponse.bind(this));
        this.localEventBus.getEvent('changeAvatarSuccess', this.onChangeAvatarSuccess.bind(this));
        this.localEventBus.getEvent('submitPasswordSuccess', this.onSubmitPasswordSuccess.bind(this));
    }

    render(root, data = {}) {
        super.render(root, data);
        this.localEventBus.callEvent('checkAuth');
    }

    onSubmitPasswordSuccess(data) {
        this.data = data;
    }

    onChangePasswodResponse(data) {
        this.data = data;
    }

    onChangeAvatarResponse () {

    }

    onChangeAvatarSuccess (data) {
        if (!data.avatar) {
            return;
        }

        this.localAvatar.src = data.avatar;
    }

    onCheckAuthorizationResponse (data = {}) {
        if (data.error || !data.isAuth) {
            this.localEventBus.callEvent('checkAuthError');
            return;
        }

        this.localEventBus.callEvent('loadUser', data);
    }

    onLoadUserResponse (data = {}) {
        if (data.error || !data.user) {
            this.localEventBus.callEvent('checkAuthError');
            return;
        }
        super.render(null, data);
        const imgTemp = document.querySelector('.avatar-img');
        imgTemp.src = data.user.avatar;

        this.initElements();
    }

    initElements () {
        this.localAvatar = document.querySelector('.avatar-img');
        this.localAvatarUploader = document.querySelector('.js-change-image');

        this.formInput =  document.querySelector('.js-change-password');

        this.passwordSubmit = this.formInput.querySelector('.js-button-submit');
        this.imputPasswordOld = this.formInput.getElementsByClassName('js-password-old')[0];
        this.imputPasswordNew = this.formInput.getElementsByClassName('js-password-new')[0];

        this.initElementsEvents();
    }

    initElementsEvents () {
        const signoutButton = document.querySelector('.js-signout');
        const buttonUp = this.localAvatarUploader;
        buttonUp.addEventListener('change', () => {
            this.localEventBus.callEvent('changeAvatar', { avatar: this.localAvatarUploader.files[0] });
        });

        signoutButton.addEventListener('click', () => {
            this.localEventBus.callEvent('sout');
        });

        this.passwordSubmit.addEventListener('click', (ev) => {
            ev.preventDefault();
            this.localEventBus.callEvent('submitPassword', { newPassword: this.imputPasswordNew.value, oldPassword: this.imputPasswordOld.value });
        });
    }
}
