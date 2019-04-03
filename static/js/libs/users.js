
class UserSingleton {
    constructor() {
        this.login = null;
        this.email = null;
        this.score = null;
        this.avatar = null;
    }

    /**
     * Устанавливает значения для юзера, можно тригерить 'setUser' -ом глобального EventBus
     * @param email
     * @param score
     * @param avatar
     * @param login
     */
    setUser({ email, score, avatar, login} = {}) {

        this.email = email;
        this.score = score;
        this.avatar = avatar;
        this.login = login;
    }

    /**
     * Удаляет данные пользователя
     */
    removeUser() {
        this.email = null;
        this.score = null;
        this.avatar = null;
        this.login = null;
    }
}


export let User = new UserSingleton();
