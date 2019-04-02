import Validation from '../libs/validation.js';
import Network from '../libs/network.js';
import api from '../libs/api.js';
import {User} from '../libs/users.js';

const OK_RESPONSE = 200;
const NETWORK_ADRESS = 'http://78.155.207.69:5051';
const AVATAR_ERROR_RESPONSE = '';

export default class profileModel {
    constructor(eventBus) {
        this.localEventBus = eventBus;

        this.localEventBus.getEvent('changePassword', this.onChangePassword.bind(this));
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
        const newAvatar = data.avatar;
        api.uploadAvatar(newAvatar).then(res => res.json().then(res => {
            if (res === AVATAR_ERROR_RESPONSE) {
                console.log(res);
                return;
            } else {
                const avatarName = res.avatar_link;

                api.updateUser({
                    avatar_input: avatarName,
                    old_password: undefined,
                    new_password: undefined
                }).then(res => {
                    if (res.ok) {
                        const avatarLink = NETWORK_ADRESS + avatarName;
                        this.localEventBus.callEvent('changeAvatarSuccess', {avatar: avatarLink});
                    } else {
                        res.json().then(dataResponse => {
                            if (dataResponse.field === 'avatar') {
                                this.localEventBus.callEvent('changeAvatarResponse', {error: dataResponse.error});
                            }
                        });
                    }
                });
            }
        }));
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
        console.log('old', passOld);
        console.log('new', passNew);
        const errPassOld = Validation.validatePassword(passOld);
        if (!errPassOld) {
            this.localEventBus.callEvent('changePasswordResponse', {error: errPassOld});
            return;
        }
        const errPassNew = Validation.validatePassword(passNew);
        if (!errPassNew) {
            this.localEventBus.callEvent('changePasswordResponse', {error: errPassNew});
            return;
        }

        api.updateUser({
            guid: this._currentUserGUID,
            avatar: this.avatar,
            old_password: passOld,
            new_password: passNew
        }).then(res => {
            if (res.ok) {
                this.localEventBus.callEvent('submitPasswordSuccess', {newPassword: passNew});
            } else {
                res.json().then(dataResponse => {
                    if (dataResponse.field === 'password') {
                        this.localEventBus.callEvent('changePasswordResponse', {error: dataResponse.error});
                    }
                });
            }
        });
    }

    /**
     * Вызываем смену пароля пользователя
     * @param {*} data
     */
    onChangePassword(data) {
        const pass = data.pass;
        const errPass = Validation.validatePassword(pass);
        if (errPass) {
            this.localEventBus.callEvent('changePasswordResponse', {error: errPass});
            return;
        }

        // TODO: update page on success change avatar
        this.localEventBus.callEvent('changePasswordResponse', {});
    }

    /**
     * Загружаем данные пользователя с сервера
     * @param {*} data
     */
    onLoadUser() {
        api.loadUser()
            .then(user => {
                if (user.error) {
                    this.localEventBus.callEvent('loadUserResponse', {});
                } else {
                    const toSetUser = {
                        avatar: user.avatar_link,
                        score: user.score || 0,
                        login: user.nickname || 'Nouserlogin',
                        email: user.email,
                        guid: user.guid,
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
                    response.json().then(data => this.localEventBus.callEvent('checkAuthResponse', {
                        isAuth: false,
                        error: data.error
                    }));
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
