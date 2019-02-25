'use strict';

import Validator from './validation.js';

const fisrtPassword = document.getElementsByClassName('js-password')[0];
const secondPassword = document.getElementsByClassName('js-password-repeat')[0];
const submit = document.getElementsByClassName('js-submit')[0];

submit.addEventListener('click', (event) => {
    event.preventDefault();

    let validate = new Validator();
    const validateFirst = validate.validatePassword(fisrtPassword);
    const validateSecond = validate.validatePassword(secondPassword);

    if (validateFirst !== validateSecond) {
        console.log('Passwords dont match');
    } else {
        console.log('Perfecto');
    }
});
