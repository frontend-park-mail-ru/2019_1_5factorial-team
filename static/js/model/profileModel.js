import Validation from '../libs/validation.js';
import Network from '../libs/network.js';
import api from '../libs/api.js';
import {User} from '../libs/users.js';
import { OK_RESPONSE, NETWORK_ADRESS, DEFAULT_AVATAR, OK_VALIDATE_PASSWORD, OK_VALIDATE_AVATAR, AVATAR_DEFAULT } from '../components/constants.js';

export default class profileModel {
    constructor(eventBus) {
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
    onChangeAvatar(data) {
        const validateNewAvatar = Validation.validateImage(data.avatar);
        if (validateNewAvatar !== OK_VALIDATE_AVATAR) {
            this.localEventBus.callEvent('changeAvatarResponse', {error: validateNewAvatar});
            return;
        }

        api.uploadAvatar(data.avatar).then(res => {
            if (res.status !== OK_RESPONSE) {
                this.localEventBus.callEvent('changeAvatarResponse', {error: res.error});
                return;
            }
            res.json().then(res => {
                if (res === DEFAULT_AVATAR || res === AVATAR_DEFAULT) {
                    this.localEventBus.callEvent('changeAvatarResponse', {avatar: AVATAR_DEFAULT});
                    return;
                } else {
                    api.updateUser({
                        avatar_input: res.avatar_link,
                        old_password: undefined,
                        new_password: undefined
                    }).then(res => {
                        if (res.status === OK_RESPONSE) {
                            const avatarLink = NETWORK_ADRESS + res.avatar_link;
                            this.localEventBus.callEvent('changeAvatarSuccess', {avatar: avatarLink});
                        } else {
                            res.json().then(res => {
                                this.localEventBus.callEvent('changeAvatarResponse', {error: res.error});
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
    onSubmitPassword(data) {
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
            avatar: this.avatar,
            old_password: passOld,
            new_password: passNew
        }).then(res => {
            if (res.ok) {
                this.localEventBus.callEvent('submitPasswordSuccess', {newPassword: passNew});
            } else {
                res.json().then(res => {
                    this.localEventBus.callEvent('changePasswordResponse', {error: res.error});
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
            .then(res => {
                if (res.error) {
                    this.localEventBus.callEvent('loadUserResponse', {});
                } else {
                    const toSetUser = {
                        avatar: res.avatar_link,
                        score: res.score,
                        login: res.nickname,
                        email: res.email,
                    };
                    User.setUser({ toSetUser });

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
                    this.localEventBus.callEvent('checkAuthResponse', {
                        isAuth: false,
                        error: response.error
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
