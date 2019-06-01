import network from './network';

export default class api {

    /**
     * Загрузка пользователя
     */
    static loadUser(): Promise<Response> {
        return network.doGet({ url:'/api/user' }).then(res => res.json());
    }

    /**
     * Проверка сессии пользователя
     */
    static sessionCheck(): Promise<Response> {
        return network.doGet({ url:'/api/session' });
    }

    /**
     * Удаление сессии для логаута
     */
    static deleteSession(): void {
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
    static login(loginOrEmail: String, password: String): Promise<Response> {
        return network.doPost({
            url: '/api/session',
            body: {
                'loginOrEmail': loginOrEmail,
                password
            }
        });
    }

    /**
     * Регистрация пользователя
     * @param {*} login
     * @param {*} email
     * @param {*} password
     */
    static signUp(login: string, email: string, password: string, avatar_link: string): Promise<Response> {
        return network.doPost({
            url: '/api/user',
            body: {
                login,
                email,
                password,
                avatar_link
            }
        });
    }

    /**
     * Счетчик пользователей для лидерборда
     */
    static getUserCount(): Promise<Response> {
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
    static updateUser(data: { old_password: string, new_password: string, avatar_input: any }): Promise<Response> {
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
    static uploadAvatar(avatar: File): Promise<Response> {
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
    static getScore({ limit = 5, offset = 0 } = {}): Promise<Response> {
        return network.doGet({
            url: `/api/user/score?limit=${limit}&offset=${offset}`
        });
    }
}
