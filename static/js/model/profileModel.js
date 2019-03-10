import Validation from '../libs/validation.js';
import Network from '../libs/network.js';
import api from '../libs/api.js';
import {User} from '../libs/users.js';

export default class profileModel {
    constructor(eventBus, globalEventBus) {
        this.localEventBus = eventBus;
        this._globalEventBus = globalEventBus;

        this.localEventBus.getEvent('changeEmail', this._onChangeEmail.bind(this));
        this.localEventBus.getEvent('changePassword', this._onChangePassword.bind(this));
        this.localEventBus.getEvent('changeAvatar', this._onChangeAvatar.bind(this));

        this.localEventBus.getEvent('submitEmail', this._onSubmitEmail.bind(this));
        this.localEventBus.getEvent('submitPassword', this._onSubmitPassword.bind(this));
        this.localEventBus.getEvent('checkAuth', this._onCheckAuth.bind(this));
        this.localEventBus.getEvent('loadUser', this._onLoadUser.bind(this));
        this.localEventBus.getEvent('sout', this._onLogout.bind(this));
    }

    _onChangeAvatar(data) {
        const avatar = data.avatar;

        const errAvatar = Validation.validateAvatar(avatar);
        if (errAvatar) {
            this.localEventBus.callEvent('changeAvatarResponse', {error: errAvatar});
            console.log(errAvatar);
            return;
        }

        api.uploadAvatar({avatar})
            .then(res => res.json())
            .then(res => {
                if (!res.avatar || res.error) {
                    this.localEventBus.callEvent('changeAvatarResponse', res);
                } else {
                    api.updateUser({guid: this._currentUserGUID, avatar: res.avatar});
                    this.localEventBus.callEvent('changeAvatarSuccess', {avatar: Network.getStorageURL() + res.avatar});
                    User.removeUser();
                }
            });
    }

    _onLogout() {
        api.deleteSession();
        this.localEventBus.callEvent('car', { isAuth: false, signout: true });
        User.removeUser();
    }

    _onSubmitPassword(data) {
        const pass = data.pass;
        const errPass = Validation.validatePassword(pass, true);
        if (errPass) {
            this.localEventBus.callEvent('changePasswordResponse', {error: errPass});
            return;
        }

        api.updateUser({
            guid: this._currentUserGUID,
            password: pass
        }).then(res => {
            if (res.ok) {
                this.localEventBus.callEvent('submitPasswordSuccess', {password: pass});
            } else {
                res.json().then(dataResponse => {
                    if (dataResponse.field === 'password') {
                        this.localEventBus.callEvent('changePasswordResponse', {error: dataResponse.error});
                    }
                });
            }
        });
    }

    _onSubmitEmail(data) {
        const email = data.email;
        const errEmail = Validation.validateEmail(email, true);
        if (errEmail) {
            this.localEventBus.callEvent('changeEmailResponse', {error: errEmail});
            return;
        }

        api.updateUser({
            guid: this._currentUserGUID,
            email
        }).then(res => {
            if (res.ok) {
                this.localEventBus.callEvent('submitEmailSuccess', {email});
            } else {
                res.json().then(dataResponse => {
                    if (dataResponse.field === 'email') {
                        this.localEventBus.callEvent('changeEmailResponse', {error: dataResponse.error});
                    }
                });
            }
        });
    }

    _onChangePassword(data) {
        const pass = data.pass;
        const errPass = Validation.validatePassword(pass, true);
        if (errPass) {
            this.localEventBus.callEvent('changePasswordResponse', {error: errPass});
            return;
        }

        this.localEventBus.callEvent('changePasswordResponse', {});
    }

    _onChangeEmail(data) {
        const email = data.email;
        const errEmail = Validation.validateEmail(email, true);

        if (errEmail) {
            this.localEventBus.callEvent('changeEmailResponse', {error: errEmail});
            return;
        }

        this.localEventBus.callEvent('changeEmailResponse', {});
    }


    _onLoadUser(data) {
        this._currentUserGUID = data.user_guid;

        if (!User.checkUser()) {
            if (!this._currentUserGUID) {
                this.localEventBus.callEvent('loadUserResponse', {});
            }

            console.log(this._currentUserGUID);
            api.loadUser(this._currentUserGUID)
                .then(user => {
                    if (user.error) {
                        this.localEventBus.callEvent('loadUserResponse', {});
                    } else {
                        const toSetUser = {
                            avatar: (user.avatar === '' ? 'images/default-avatar.svg' : Network.getStorageURL() + user.avatar),
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
                avatar: User.avatar,
                email: User.email,
            }});
        }
    }

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
