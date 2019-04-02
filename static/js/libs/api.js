import network from './network.js';

export default class api {

    /**
     * Загрузка пользователя
     * @param {*} user
     */
    static loadUser() {
        return network.doGet({ url:'/api/user' }).then(res => res.json());
    }

    /**
     * Проверка сессии пользователя
     */
    static sessionCheck() {
        return network.doGet({ url:'/api/session' });
    }

    /**
     * Удаление сессии для логаута
     */
    static deleteSession() {
        network.doDelete({ url:'/api/session' }).then(response => {
            if (!response.ok) {
                throw new Error(`fetch out (url: ${response.url}, status: ${response.status})`);
            }
        }).catch(error => console.error(error));
    }

    /**
     * Авторизация пользователя
     * @param {*} loginOrEmail
     * @param {*} password
     */
    static login({ loginOrEmail, password } = {}) {
        return network.doPost({
            url: '/api/session',
            body: {
                'loginOrEmail': loginOrEmail,
                password
            }
        });
    }

    static loginOauth({ token, service } = {}) {
        return network.doPost({
            url: `/api/login_${service}`,
            body: {
                'token': token
            }
        });
    }

    /**
     * Регистрация пользователя
     * @param {*} login
     * @param {*} email
     * @param {*} password
     */
    static signUp({ login, email, password }) {
        return network.doPost({
            url: '/api/user',
            body: {
                email,
                login,
                password
            }
        });
    }

    /**
     * Счетчик пользователей для лидерборда
     */
    static getUserCount() {
        return network.doGet({
            url: '/api/user/count'
        });
    }

    /**
     * Обновление данных пользователя
     * @param {*} old_password
     * @param {*} new_password
     * @param {*} avatar_input
     */
    static updateUser({ old_password, new_password, avatar_input } = {}) {
        return network.doPut({
            url: '/api/user',
            body: {
                'avatar': avatar_input,
                'new_password': new_password,
                'old_password': old_password
            }
        });
    }

    /**
     * Загрузка нового аватара на бэк
     * @param {*} avatar
     */
    static uploadAvatar(avatar) {
        const formData = new FormData();
        formData.append('upload', avatar);
        return network.doPostFormData({
            url: '/api/upload_avatar',
            body: formData
        });
    }

    /**
     * Получение рекордов пользователей
     * @param {*} limit
     * @param {*} offset
     */
    static getScore({ limit = 5, offset = 0 } = {}) {
        return network.doGet({
            url: `/api/user/score?limit=${limit}&offset=${offset}`
        });
    }
}
