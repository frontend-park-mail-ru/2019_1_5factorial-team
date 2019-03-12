import Validation from '../libs/validation.js';
import Network from '../libs/network.js';
import api from '../libs/api.js';
import {User} from '../libs/users.js';

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
        this.data = data;
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
    onLoadUser(data) {
        this._currentUserGUID = data.user_guid;
        api.loadUser(this._currentUserGUID)
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

                    this._currentUserGUID = user.guid;
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
                if (response.status !== 200) {
                    response.json().then(data => this.localEventBus.callEvent('checkAuthResponse', {
                        isAuth: false,
                        error: data.error
                    }));
                } else {
                    response.json().then(data => {
                        this.localEventBus.callEvent('checkAuthResponse', {
                            isAuth: true,
                            user_guid: data.user_guid
                        });
                    });
                }
            })
            .catch((error) => {
                this.localEventBus.callEvent('checkAuthResponse', {error});
            });
    }
}
