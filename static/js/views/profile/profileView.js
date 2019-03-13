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

    onChangeAvatarResponse() {

    }

    onChangeAvatarSuccess(data) {
        if (!data.avatar) {
            return;
        }

        this.localAvatar.src = data.avatar;
    }

    onCheckAuthorizationResponse(data = {}) {
        if (data.error || !data.isAuth) {
            this.localEventBus.callEvent('checkAuthError');
            return;
        }

        this.localEventBus.callEvent('loadUser', data);
    }

    onLoadUserResponse(data = {}) {
        if (data.error || !data.user) {
            this.localEventBus.callEvent('checkAuthError');
            return;
        }
        if (data.avatar !== '') {
            data.user.avatar = 'http://78.155.207.69:5051' + data.user.avatar;
        }
        super.render(null, data);
        const imgTemp = document.getElementsByClassName('avatar-img')[0];
        imgTemp.src = data.user.avatar;

        this.initElements();
    }

    initElements() {
        this.localAvatar = document.getElementsByClassName('js-upload-avatar')[0];
        this.localAvatarUploader = document.getElementsByClassName('js-change-image')[0];

        this.formInput =  document.getElementsByClassName('js-change-password')[0];

        this.passwordSubmit = this.formInput.getElementsByClassName('js-button-submit')[0];
        this.imputPasswordOld = this.formInput.getElementsByClassName('js-password-old')[0];
        this.imputPasswordNew = this.formInput.getElementsByClassName('js-password-new')[0];

        this.initElementsEvents();
    }

    initElementsEvents() {
        const signoutButton = document.getElementsByClassName('js-signout')[0];
        const buttonUp = this.localAvatarUploader;
        buttonUp.addEventListener('change', () => {
            this.localEventBus.callEvent('changeAvatar', { avatar: this.localAvatarUploader.files[0] });
        });

        signoutButton.addEventListener('click', () => {
            this.localEventBus.callEvent('signOut');
        });

        this.passwordSubmit.addEventListener('click', (event) => {
            event.preventDefault();
            this.localEventBus.callEvent('submitPassword', { 
                newPassword: this.imputPasswordNew.value, 
                oldPassword: this.imputPasswordOld.value 
            });
        });
    }
}
