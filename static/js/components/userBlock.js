'use strict';

export default class userBlock {
    changeButtons(isAuth = false) {
        const userButtons = document.getElementsByClassName('js-check-auth')[0];
        if (isAuth) {
            userButtons.innerHTML = `<a class="btn users__btn_action" href="/profile">Profile</a>
            <a class="btn users__btn_action js-signout" href="/">SignOut</a>`;
            return true;
        } else {
            userButtons.innerHTML = `<a class="btn users__btn login-btn" href="/login">Login</a>
            <a class="btn users__btn signup-btn" href="/signup">SignUp</a>`;
            return false;
        }
    }
}