'use strict';

class Validator {
    /**
     * @return {boolean}
     */
    constructor() {}

    /**
     * validateEmail - check validity of input email (using RegExp)
     * @param {string} email
     * @return {boolean}
     */
    validateEmail (email) {
        const expression = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/);
        const res = expression.test(email);
        if (res) {
            console.log('correct email!');
            return true;
        }
        console.log('incorrect email!');
        return false;
    }

    /**
     * validateLogin - check validity of input login (only for length)
     * @param {HTMLElement} myInput
     * @return {boolean}
     */
    validateLogin  (myInput)  {
        const lengthOfLogin = myInput.value.length;
        if (lengthOfLogin >= 6) {
            myInput.classList.remove('invalid');
            myInput.classList.add('valid');
            console.log('correct login!');
            return true;
        } else {
            myInput.classList.remove('valid');
            myInput.classList.add('invalid');
            console.log('incorrect login!');
            return false;
        }
    }

    /**
     * validatePassword - check validity of input password (only for length)
     * @param {HTMLElement} myInput
     * @return {boolean}
     */
    validatePassword  (myInput)  {
        const lengthOfPass = myInput.value.length;
        if (lengthOfPass >= 4) {
            myInput.classList.remove('invalid');
            myInput.classList.add('valid');
            console.log('correct password!');
            return true;
        } else {
            myInput.classList.remove('valid');
            myInput.classList.add('invalid');
            console.log('incorrect password!');
            return false;
        }
    }

    /**
     * validateImage - check validity of input image
     * @param {HTMLElement} myInput
     * @return {boolean}
     */
    validateImage  (myInput)  {
        const typeOfImage = myInput.type;
        if ((typeOfImage !== 'image/jpeg') || (typeOfImage !== 'image/png')) {
            myInput.classList.remove('valid');
            myInput.classList.add('invalid');
            console.log('invalid format of image!');
            return false;
        } else {
            myInput.classList.remove('invalid');
            myInput.classList.add('valid');
            console.log('valid format of image!');
            return true;
        }
    }

    /**
     * validateRepeatPasswords - check validity of input passwords and compare them
     * @param first
     * @param second
     * @return {boolean}
     */
    validateRepeatPasswords  (first, second)  {
        const firstPass = first.value;
        const secPass = second.value;

        if (firstPass !== secPass) {
            console.log('Passwords not match!');
            return false;
        } else {
            console.log('Passwords match!');
            return true;
        }
    }
}
// Temp DOM's elems for future validation!
// const avatarInput = document.getElementsByClassName('js-avatar')[0];
// const firstPassInput = document.getElementsByClassName('js-password')[0];
// const secondPassInput = document.getElementsByClassName('js-password')[1];

const submit = document.getElementsByClassName('js-submit')[0];
submit.addEventListener('click', (event) => {
    event.preventDefault();
    const passInput = document.getElementsByClassName('js-password')[0];
    const logInput = document.getElementsByClassName('js-login-or-email')[0];

    const validate = new Validator();
    const checkLogin = validate.validateLogin(logInput);
    const checkPass = validate.validatePassword(passInput);
    const checkEmail = validate.validateEmail(logInput);
    if (checkLogin && checkPass) {
        console.log('Success!');
    } else if (checkEmail && checkPass) {
        console.log('Success!');
    } else {
        console.log('Smth went wrong!');
    }
});