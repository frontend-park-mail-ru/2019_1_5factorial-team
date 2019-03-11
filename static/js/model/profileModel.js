import Validation from '../libs/validation.js';
import Network from '../libs/network.js';
import api from '../libs/api.js';
import {User} from '../libs/users.js';

export default class profileModel {
    constructor(eventBus) {
        this.localEventBus = eventBus;

        this.localEventBus.getEvent('changePassword', this._onChangePassword.bind(this));
        this.localEventBus.getEvent('changeAvatar', this._onChangeAvatar.bind(this));

        this.localEventBus.getEvent('submitPassword', this._onSubmitPassword.bind(this));
        this.localEventBus.getEvent('checkAuth', this._onCheckAuth.bind(this));
        this.localEventBus.getEvent('loadUser', this._onLoadUser.bind(this));
        this.localEventBus.getEvent('sout', this._onLogout.bind(this));
    }

    /**
     * Проверяем смену аватара
     */
    _onChangeAvatar(data) {
        this.data = data;
    }

    /**
     * Заканчиваем сессию пользователя
     */
    _onLogout() {
        api.deleteSession();
        this.localEventBus.callEvent('car', { isAuth: false, signout: true });
        User.removeUser();
    }

    /**
     * Вызываем смену пароля пользователя
     * @param {*} data
     */
    _onSubmitPassword(data) {
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
    _onChangePassword(data) {
        const pass = data.pass;
        const errPass = Validation.validatePassword(pass);
        if (errPass) {
            this.localEventBus.callEvent('changePasswordResponse', {error: errPass});
            return;
        }

        this.localEventBus.callEvent('changePasswordResponse', {});
    }

    /**
     * Загружаем данные пользователя с сервера
     * @param {*} data
     */
    _onLoadUser(data) {
        this._currentUserGUID = data.user_guid;

        if (!User.checkUser()) {
            if (!this._currentUserGUID) {
                this.localEventBus.callEvent('loadUserResponse', {});
            }

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
        } else {
            this.localEventBus.callEvent('loadUserResponse', {user: {
                login: User.nickname,
                guid: User.guid,
                score: User.score,
                avatar: User.avatar_link,
                email: User.email,
            }});
        }
    }

    /**
     * Проверяем пользователя - авторизован ли
     */
    _onCheckAuth() {
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
