import Validation from '../libs/validation';
import Network from '../libs/network';
import api from '../libs/api';
import {User} from '../libs/users';
import { OK_RESPONSE, NETWORK_ADRESS, DEFAULT_AVATAR, OK_VALIDATE_PASSWORD, OK_VALIDATE_AVATAR, AVATAR_DEFAULT } from '../components/constants';
import EventBus from '../libs/eventBus';

export default class profileModel {
    localEventBus: EventBus;
    avatar: any;
    constructor(eventBus: EventBus) {
        this.localEventBus = eventBus;
        this.localEventBus.getEvent('changeAvatar', this.onChangeAvatar.bind(this));

        this.localEventBus.getEvent('submitPassword', this.onSubmitPassword.bind(this));
        this.localEventBus.getEvent('checkAuth', this.onCheckAuth.bind(this));
        this.localEventBus.getEvent('loadUser', this.onLoadUser.bind(this));
        this.localEventBus.getEvent('signOut', this.onLogout.bind(this));
    }

    /**
     * Проверяем смену аватара
     */
    onChangeAvatar(data: {avatar: File}) {
        const validateNewAvatar = Validation.validateImage(data.avatar);
        if (validateNewAvatar !== OK_VALIDATE_AVATAR) {
            this.localEventBus.callEvent('changeAvatarResponse', {error: validateNewAvatar});
            return;
        }

        api.uploadAvatar(data.avatar).then(response => {
            if (response.status !== OK_RESPONSE) {
                response.json().then(data => this.localEventBus.callEvent('changeAvatarResponse', {error: data.error}));
                return;
            }
            response.json().then(response => {
                if (response === DEFAULT_AVATAR || response === AVATAR_DEFAULT) {
                    this.localEventBus.callEvent('changeAvatarResponse', {avatar: AVATAR_DEFAULT});
                    return;
                } else {
                    api.updateUser({
                        avatar_input: response.avatar_link,
                        old_password: undefined,
                        new_password: undefined
                    }).then(response => {
                        if (response.status === OK_RESPONSE) {
                            response.json().then(data => {
                                const avatarLink = NETWORK_ADRESS + data.avatar_link;
                                this.localEventBus.callEvent('changeAvatarSuccess', {avatar: avatarLink})
                            });
                        } else {
                            response.json().then(response => {
                                this.localEventBus.callEvent('changeAvatarResponse', {error: response.error});
                            });
                        }
                    });
                }
            });
        });
    }

    /**
     * Заканчиваем сессию пользователя
     */
    onLogout() {
        api.deleteSession();
        this.localEventBus.callEvent('closeView', { isAuth: false, signout: true });
        User.removeUser();
    }

    /**
     * Вызываем смену пароля пользователя
     * @param {*} data
     */
    onSubmitPassword(data: {oldPassword: string, newPassword: string}) {
        const passOld = data.oldPassword;
        const passNew = data.newPassword;
        const errPassOld = Validation.validatePassword(passOld);
        if (errPassOld !== OK_VALIDATE_PASSWORD) {
            this.localEventBus.callEvent('changePasswordResponse', {error: errPassOld});
            return;
        }
        const errPassNew = Validation.validatePassword(passNew);
        if (errPassNew !== OK_VALIDATE_PASSWORD) {
            this.localEventBus.callEvent('changePasswordResponse', {error: errPassNew});
            return;
        }

        api.updateUser({
            old_password: passOld,
            new_password: passNew,
            avatar_input: this.avatar,
        }).then(response => {
            if (response.ok) {
                this.localEventBus.callEvent('submitPasswordSuccess', {newPassword: passNew});
            } else {
                response.json().then(response => {
                    this.localEventBus.callEvent('changePasswordResponse', {error: response.error});
                });
            }
        });
    }

    /**
     * Загружаем данные пользователя с сервера
     * @param {*} data
     */
    onLoadUser() {
        api.loadUser()
            .then(response => {
                if (response.error) {
                    this.localEventBus.callEvent('loadUserResponse', {});
                } else {
                    const toSetUser = {
                        avatar: response.avatar_link,
                        score: response.score,
                        login: response.nickname,
                        email: response.email,
                    };
                    User.setUser(toSetUser);

                    this.localEventBus.callEvent('loadUserResponse', {user: toSetUser});
                }
            });
    }

    /**
     * Проверяем пользователя - авторизован ли
     */
    onCheckAuth() {
        Network.doGet({url: '/api/session'})
            .then(response => {
                if (response.status !== OK_RESPONSE) {
                    response.json().then(data => {
                        this.localEventBus.callEvent('checkAuthResponse', {
                        isAuth: false,
                        error: data.error
                    })
                });
                } else {
                    response.json().then(() => {
                        this.localEventBus.callEvent('checkAuthResponse', {
                            isAuth: true,
                        });
                    });
                }
            })
            .catch((error) => {
                this.localEventBus.callEvent('checkAuthResponse', {error});
            });
    }
}
