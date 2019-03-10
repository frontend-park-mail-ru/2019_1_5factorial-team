import network from './network.js';

export default class api {

    /**
     * Загрузка пользователя
     * @param {*} user 
     */
    static loadUser(user) {
        return network.doGet({ url:`/api/user/${user}` }).then(res => res.json());
    }

    static sessionCheck() {
        return network.doGet({ url:'/api/session' });
    }

    static deleteSession() {
        network.doDelete({ url:'/api/session' }).then(response => {
            if (!response.ok) {
                throw new Error(`fetch out (url: ${response.url}, status: ${response.status})`);
            }
        }).catch(error => console.error(error));
    }

    static login({ loginOrEmail, password } = {}) {
        console.log(loginOrEmail);
        return network.doPost({
            url: '/api/session',
            body: {
                'loginOrEmail': loginOrEmail,
                password
            }
        });
    }

    static signUp({ login, email, password }) {
        return network.doPost({
            url: '/api/user',
            body: {
                email,
                login,
                password
            }
        }, console.log('signup api debug'));
    }

    static getUserCount () {
        return network.doGet({
            url: '/api/user/count'
        });
    }

    static updateUser ({ user, email, password, avatar } = {}) {
        return network.doPut({
            url: `/api/user/${user}`,
            body: {
                email,
                password,
                avatar
            }
        });
    }

    static uploadAvatar ({ avatar } = {}) {
        let formData = new FormData();
        formData.append('avatar', avatar);
        return network.doPostFormData({
            url: '/api/avatar',
            body: formData
        });
    }

    static getScore ({ limit = 5, offset = 0 } = {}) {
        return network.doGet({
            url: `/api/user/score/?limit=${limit}&offset=${offset}`
        });
    }


}