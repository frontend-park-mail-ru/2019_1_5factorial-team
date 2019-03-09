'use strict';

import Validator from './validation.js';

// Temp DOM's elems for future validation!
// const avatarInput = document.getElementsByClassName('js-avatar')[0];
// const firstPassInput = document.getElementsByClassName('js-password')[0];
// const secondPassInput = document.getElementsByClassName('js-password')[1];

const submitLogin = document.getElementsByClassName('js-submit-login')[0];

submitLogin.addEventListener('click', (event) => {
    event.preventDefault();
    const passInput = document.getElementsByClassName('js-password')[0];
    const logInput = document.getElementsByClassName('js-login-or-email')[0];

    const checkLogin = Validator.validateLogin(logInput);
    const checkPass = Validator.validatePassword(passInput);
    const checkEmail = Validator.validateEmail(logInput);
    if (checkLogin && checkPass || checkEmail && checkPass) {
        console.log('Success!');
    } else {
        console.log('Smth went wrong!');
    }
});
