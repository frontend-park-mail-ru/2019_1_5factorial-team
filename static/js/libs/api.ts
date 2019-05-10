import network from './network';

export default class api {

    /**
     * Загрузка пользователя
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
    static login(loginOrEmail: String, password: String) {
        return network.doPost({
            url: '/api/session',
            body: {
                'loginOrEmail': loginOrEmail,
                password
            }
        });
    }

    /**
     * Авторизация через сторонние сервисы
     * @param {*} token
     * @param {*} service
     * */
    static loginOauth(data: { token: String, service: String }) {
        return network.doPost({
            url: `/api/session/oauth/${data.service}`,
            body: {
                'token': data.token
            }
        });
    }

    /**
     * Регистрация пользователя
     * @param {*} login
     * @param {*} email
     * @param {*} password
     */
    static signUp(login: string, email: string, password: string) {
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
    static updateUser(data: { old_password: string, new_password: string, avatar_input: any }) {
        return network.doPut({
            url: '/api/user',
            body: {
                'avatar': data.avatar_input,
                'new_password': data.new_password,
                'old_password': data.old_password
            }
        });
    }

    /**
     * Загрузка нового аватара на бэк
     * @param {*} avatar
     */
    static uploadAvatar(avatar: File) {
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
