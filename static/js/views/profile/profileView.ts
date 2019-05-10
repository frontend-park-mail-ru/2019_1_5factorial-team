import View from '../../libs/views';
import ModalWindow from '../../components/modalWindow/modalWindow';
import { NETWORK_ADRESS, AVATAR_DEFAULT, DEFAULT_AVATAR } from '../../components/constants';
import template from './profileView.tmpl.xml';

import '../../components/userBlock/userblock.scss';
import '../../../css/form.scss';
import EventBus from '../../libs/eventBus';

export default class profileView extends View {
    localAvatar: Element | HTMLImageElement;
    localAvatarUploader: Element;
    callSubmit: Element;
    inputPasswordOld: HTMLInputElement;
    inputPasswordNew: HTMLInputElement
    submitPassword: Element;
    formInput: Element;
    constructor(eventBus: EventBus) {
        super(template, eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('checkAuthResponse', this.onCheckAuthorizationResponse.bind(this));
        this.localEventBus.getEvent('loadUserResponse', this.onLoadUserResponse.bind(this));

        this.localEventBus.getEvent('changePasswordResponse', this.onChangePasswodResponse.bind(this));
        this.localEventBus.getEvent('changeAvatarResponse', this.onChangeAvatarResponse.bind(this));
        this.localEventBus.getEvent('changeAvatarSuccess', this.onChangeAvatarSuccess.bind(this));
        this.localEventBus.getEvent('submitPasswordSuccess', this.onSubmitPasswordSuccess.bind(this));
    }

    render(root: Element) {
        if (root !== undefined) {
            this.prevRoot = root;
        }
        this.localEventBus.callEvent('checkAuth');
        return this;
    }

    onSubmitPasswordSuccess(data: { newPassword: any; }) {
        if (data.newPassword) {
            const MW = new ModalWindow();
            MW.createModal('Profile change password success');
        }
    }

    onChangePasswodResponse(data: { error: any; }) {
        //TODO(): добавить обработку ошибки в верстке
        console.log(data.error);
    }

    onChangeAvatarResponse(data: { error: any; }) {
        if (data.error !== undefined) {
            console.log(data.error);
            return;
        }
        (this.localAvatar as HTMLElement).style.background = `transparent url(${AVATAR_DEFAULT}) no-repeat`;
        (this.localAvatar as HTMLElement).style.backgroundSize = 'cover';
        (this.localAvatar as HTMLElement).style.backgroundPosition = 'center';
        this.localEventBus.callEvent('loadUser', data);
    }

    onChangeAvatarSuccess(data: { avatar: any; }) {
        console.log(data);
        (this.localAvatar as HTMLImageElement).src = data.avatar;
        this.localEventBus.callEvent('loadUser', data);
    }

    onCheckAuthorizationResponse(data: { error?: any; isAuth?: any; }) {
        if (data.error || !data.isAuth) {
            this.localEventBus.callEvent('checkAuthError');
            return;
        }
        this.localEventBus.callEvent('loadUser', data);
    }

    onLoadUserResponse(data: { users?: any; error?: any; user?: any; }) {
        if (data.error || !data.user) {
            this.localEventBus.callEvent('checkAuthError');
            return;
        }
        // TODO(): перехать просто на пустую строку вида ''
        if (data.user.avatar === DEFAULT_AVATAR || data.user.avatar === AVATAR_DEFAULT) {
            data.user.avatar = AVATAR_DEFAULT;
        } else {
            data.user.avatar = NETWORK_ADRESS + data.user.avatar;
        }
        super.render(this.prevRoot, data);
        const imgToSet = document.getElementsByClassName('avatar__img')[0];
        (imgToSet as HTMLElement).style.background = `transparent url(${data.user.avatar}) no-repeat`;
        (imgToSet as HTMLElement).style.backgroundSize = 'cover';
        (imgToSet as HTMLElement).style.backgroundPosition = 'center';

        this.initElements();
    }

    initElements() {
        this.localAvatar = document.getElementsByClassName('js-upload-avatar')[0];
        this.localAvatarUploader = document.getElementsByClassName('js-change-image')[0];

        this.formInput =  document.getElementsByClassName('js-change-password')[0];

        this.callSubmit = this.formInput.getElementsByClassName('js-call-submit')[0];
        this.initElementsEvents();
    }

    initElementsEvents() {
        const signoutButton = document.getElementsByClassName('js-signout')[0];
        const buttonUp = this.localAvatarUploader;
        const MW = new ModalWindow();
        buttonUp.addEventListener('change', () => {
            this.localEventBus.callEvent('changeAvatar', { avatar: (this.localAvatarUploader as HTMLInputElement).files[0] });
        });

        signoutButton.addEventListener('click', () => {
            this.localEventBus.callEvent('signOut');
        });

        this.callSubmit.addEventListener('click', (event: { preventDefault: () => void; }) => {
            event.preventDefault();

            MW.createModal('Profile change password');
            (this.inputPasswordOld as Element) = document.getElementsByClassName('js-password-old')[0];
            (this.inputPasswordNew as Element) = document.getElementsByClassName('js-password-new')[0];
            this.submitPassword = document.getElementsByClassName('js-button-submit')[0];

            this.submitPassword.addEventListener('click', (event: { preventDefault: () => void; }) => {
                event.preventDefault();
                this.localEventBus.callEvent('submitPassword', {
                    newPassword: this.inputPasswordNew.value,
                    oldPassword: this.inputPasswordOld.value
                });
            });
        });
    }
}
