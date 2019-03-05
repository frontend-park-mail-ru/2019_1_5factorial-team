'use strict';

import Validator from './validation.js';

const submitRegistration = document.getElementsByClassName('js-submit-registration')[0];

const validate = new Validator();
submitRegistration.addEventListener('click', (event) => {
    event.preventDefault();
    const passInput = document.getElementsByClassName('js-password')[0];
    const loginInput = document.getElementsByClassName('js-email')[0];

    const emailInput = document.getElementsByClassName('js-login')[0];
    const checkLogin = validate.validateLogin(loginInput);
    const checkPass = validate.validatePassword(passInput);
    const checkEmail = validate.validateEmail(emailInput);
    if (checkLogin && checkPass && checkEmail) {
        console.log('Success!');
    } else {
        console.log('Smth went wrong!');
    }
});