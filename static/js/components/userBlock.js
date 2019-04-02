'use strict';

export default class userBlock {
    changeButtons(isAuth = false) {
        const userButtons = document.getElementsByClassName('js-check-auth')[0];
        if (isAuth) {
            userButtons.innerHTML = `<a class="btn users__btn_action" href="/profile">Profile</a>
            <a class="btn users__btn_action js-signout" href="/">Sign Out</a>`;
            return true;
        } else {
            userButtons.innerHTML = `<a class="btn users__btn login-btn" href="/login">Log In</a>
            <a class="btn users__btn signup-btn" href="/signup">Sign Up</a>`;
            return false;
        }
    }
}