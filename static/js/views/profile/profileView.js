import View from '../../libs/views.js';
import ModalWindow from '../../components/modalWindow.js';
import { NETWORK_ADRESS, AVATAR_DEFAULT, DEFAULT_AVATAR } from '../../components/constants.js';
import template from './profileView.tmpl.xml';
import chat from '../../components/chat.js';

export default class profileView extends View {
    constructor({ eventBus = {} }) {
        super(template, eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('checkAuthResponse', this.onCheckAuthorizationResponse.bind(this));
        this.localEventBus.getEvent('loadUserResponse', this.onLoadUserResponse.bind(this));

        this.localEventBus.getEvent('changePasswordResponse', this.onChangePasswodResponse.bind(this));
        this.localEventBus.getEvent('changeAvatarResponse', this.onChangeAvatarResponse.bind(this));
        this.localEventBus.getEvent('changeAvatarSuccess', this.onChangeAvatarSuccess.bind(this));
        this.localEventBus.getEvent('submitPasswordSuccess', this.onSubmitPasswordSuccess.bind(this));
    }

    render(root) {
        if (root !== undefined) {
            this.prevRoot = root;
        }
        this.localEventBus.callEvent('checkAuth');
    }

    onSubmitPasswordSuccess(data) {
        if (data.newPassword) {
            const MW = new ModalWindow();
            MW.createModal('Profile change password success');
        }
    }

    onChangePasswodResponse(data) {
        //TODO(): добавить обработку ошибки в верстке
        console.log(data.error);
    }

    onChangeAvatarResponse(data) {
        if (data.error !== undefined) {
            console.log(data.error);
            return;
        }
        this.localAvatar.style.background = `transparent url(${AVATAR_DEFAULT}) no-repeat`;
        this.localAvatar.style.backgroundSize = 'cover';
        this.localAvatar.style.backgroundPosition = 'center';
        this.localEventBus.callEvent('loadUser', data);
    }

    onChangeAvatarSuccess(data) {
        console.log(data);
        this.localAvatar.src = data.avatar;
        this.localEventBus.callEvent('loadUser', data);
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
        // TODO(): перехать просто на пустую строку вида ''
        if (data.user.avatar === DEFAULT_AVATAR || data.user.avatar === AVATAR_DEFAULT) {
            data.user.avatar = AVATAR_DEFAULT;
        } else {
            data.user.avatar = NETWORK_ADRESS + data.user.avatar;
        }
        super.render(this.prevRoot, data);
        const imgToSet = document.getElementsByClassName('avatar-img')[0];
        imgToSet.style.background = `transparent url(${data.user.avatar}) no-repeat`;
        imgToSet.style.backgroundSize = 'cover';
        imgToSet.style.backgroundPosition = 'center';

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
            this.localEventBus.callEvent('changeAvatar', { avatar: this.localAvatarUploader.files[0] });
        });

        signoutButton.addEventListener('click', () => {
            this.localEventBus.callEvent('signOut');
        });

        this.callSubmit.addEventListener('click', (event) => {
            event.preventDefault();

            MW.createModal('Profile change password');
            this.inputPasswordOld = document.getElementsByClassName('js-password-old')[0];
            this.inputPasswordNew = document.getElementsByClassName('js-password-new')[0];
            this.submitPassword = document.getElementsByClassName('js-button-submit')[0];

            this.submitPassword.addEventListener('click', (event) => {
                event.preventDefault();
                this.localEventBus.callEvent('submitPassword', {
                    newPassword: this.inputPasswordNew.value,
                    oldPassword: this.inputPasswordOld.value
                });
            });
        });
    }

    onShowingChat() {
        let chatButton = document.getElementsByClassName('js-chat-btn')[0];
        let returnChatButton = document.getElementsByClassName('js-hidden-chat-btn')[0];

        chatButton.addEventListener('click',  () => {
            if (!this.chatIsShown) {
                document.getElementsByClassName('js-chat-window')[0].classList.remove('hide');
                chatButton.classList.add('hide');
                this.chat = new chat(this.localEventBus);
                this.chatIsShown = true;
            }
        });

        returnChatButton.addEventListener('click',  () => {
            if (!this.chatIsShown) {
                document.getElementsByClassName('js-chat-window')[0].classList.remove('hide');
                returnChatButton.classList.add('hide');
                this.chatIsShown = true;
            }
        });

        const messageInput = document.getElementsByClassName('js-message-input')[0];
        messageInput.addEventListener('keydown', (event) => {
            if (event.keyCode !== 13) {
                this.chat.sendMessage('TYPING', messageInput.value);
            } else {
                this.chat.sendMessage('NEW', messageInput.value);
            }
        });

        const closeChatAndWs = document.getElementsByClassName('js-close-chat')[0];
        closeChatAndWs.addEventListener('click', () => {
            this.chat.close();
            delete this.chat;
        });
    }

    onHidingChat() {
        const closeChatButton = document.getElementsByClassName('js-close-chat')[0];
        const hideChatButton = document.getElementsByClassName('js-hide-chat')[0];

        closeChatButton.addEventListener('click', () => {
            if (this.chatIsShown) {
                document.getElementsByClassName('js-chat-window')[0].classList.add('hide');
                document.getElementsByClassName('js-chat-btn')[0].classList.remove('hide');
                this.chatIsShown = false;
            }
        });

        hideChatButton.addEventListener('click', () => {
            if (this.chatIsShown) {
                document.getElementsByClassName('js-chat-window')[0].classList.add('hide');
                document.getElementsByClassName('js-hidden-chat-btn')[0].classList.remove('hide');
                this.chatIsShown = false;
            }
        });
    }

    printMessage(message) {
        const text = message.text;
        let elemToAppend = document.createElement('div');
        elemToAppend.classList.add('message');
        elemToAppend.classList.add('js-message');
        elemToAppend.textContent = text;
        this.toAppend = document.getElementsByClassName('messages')[0];
        this.toAppend.append(elemToAppend);
    }
}
