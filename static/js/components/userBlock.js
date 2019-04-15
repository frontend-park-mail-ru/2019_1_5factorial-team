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

    gameButtons(data = {}) {
        const userButtons = document.getElementsByClassName('js-check-user')[0];
        if (data !== null) {
            userButtons.innerHTML = `<a class="btn users__btn login-btn">${data.user.nickname}</a>
            <a class="btn users__btn signup-btn js-back-to-menu" href="/">Back to menu</a>`;
            return true;
        } else {
            userButtons.innerHTML = `<a class="btn users__btn signup-btn js-back-to-menu" href="/">Back to menu
            </a>`;
            return false;
        }
    }
}