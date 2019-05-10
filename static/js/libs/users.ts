
class UserSingleton {
    login: String;
    email: String;
    score: String;
    avatar: String;
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
    setUser(toSetUser: { email: String, score: String, avatar: String, login: String}) {

        this.avatar = toSetUser.avatar;
        this.score = toSetUser.score;
        this.email = toSetUser.email;
        this.login = toSetUser.login;
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
