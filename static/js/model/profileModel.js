import Validation from '../libs/validation.js';
import Network from '../libs/network.js';
import api from '../libs/api.js';
import {User} from '../libs/users.js';

export default class profileModel {
    constructor(eventBus, globalEventBus) {
        this.localEventBus = eventBus;
        this._globalEventBus = globalEventBus;

        this.localEventBus.getEvent('changePassword', this._onChangePassword.bind(this));
        this.localEventBus.getEvent('changeAvatar', this._onChangeAvatar.bind(this));

        this.localEventBus.getEvent('submitPassword', this._onSubmitPassword.bind(this));
        this.localEventBus.getEvent('checkAuth', this._onCheckAuth.bind(this));
        this.localEventBus.getEvent('loadUser', this._onLoadUser.bind(this));
        this.localEventBus.getEvent('sout', this._onLogout.bind(this));
    }

    _onChangeAvatar(data) {
        const avatar = data.avatar;
        console.log(avatar);

        // const errAvatar = Validation.validateImage(avatar);
        // if (!errAvatar) {
        //     this.localEventBus.callEvent('changeAvatarResponse', {error: errAvatar});
        //     console.log(errAvatar);
        //     return;
        // }

        const avatar_input = avatar;
        const formData = new FormData();
        formData.append('avatar', avatar_input);
        api.uploadAvatarNode({formData}).then(res => res.json()).then(res => {
            if (res !== 200) {
                console.log('error on wpload');
                console.log(res);
                const avatarName = '../../../img/' + res;

                console.log(avatarName);

                api.updateUser({
                    avatar_input: avatarName,
                    // password: pass
                    old_password: undefined,
                    new_password: undefined
                }).then(res => {
                    if (res.ok) {
                        this.localEventBus.callEvent('changeAvatarSuccess', {avatar: avatarName});
                    } else {
                        res.json().then(dataResponse => {
                            if (dataResponse.field === 'avatar') {
                                this.localEventBus.callEvent('changeAvatarResponse', {error: dataResponse.error});
                            }
                            console.log('res body of updat', res.body);
                        });
                    }
                });
            } else {
                console.log('success on upload');
            }
        });

        // api.updateUser({avatar_input})
        //     .then(res => res.json())
        //     .then(res => {
        //         if (!res.avatar || res.error) {
        //             this.localEventBus.callEvent('changeAvatarResponse', res);
        //         } else {
        //             api.updateUser({guid: this._currentUserGUID, avatar: res.avatar});
        //             this.localEventBus.callEvent('changeAvatarSuccess', {avatar: Network.getStorageURL() + res.avatar});
        //             User.removeUser();
        //         }
        //     });
    }

    _onLogout() {
        api.deleteSession();
        this.localEventBus.callEvent('car', { isAuth: false, signout: true });
        User.removeUser();
    }

    _onSubmitPassword(data) {
        console.log(data);
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
            // password: pass
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
                    console.log('res body of updat', res.body);
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
        console.log('onLoadUser data ', data);

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
                        console.log('loadUser in profile ', toSetUser);
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
