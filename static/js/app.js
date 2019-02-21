'use strict';

class Validator {
    /**
     * @return {boolean}
     */
    constructor(user, pass) {
        if (this.validateEmail(user)) {
            if (this.validatePassword(pass)) {
                alert('enter');
                return true;
            }
        } else if (this.validateLogin(user)) {
            if (this.validatePassword(pass)) {
                alert('enter');
                return true;
            }
        } else {
            alert('ploho');
            return false;
        }
    };

    validateEmail = email => {
        let expression = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/);
        let res = expression.test(email);
        if (res) {
            console.log('correct email!');
            return true
        }
        console.log('incorrect email!');
        return false
    };

    validateLogin = myInput => {
        const lengthOfLogin = myInput.value.length;
        if (lengthOfLogin >= 6) {
            myInput.classList.remove("invalid");
            myInput.classList.add("valid");
            console.log('correct login!');
            return true
        } else {
            myInput.classList.remove("valid");
            myInput.classList.add("invalid");
            console.log('incorrect login!');
            return false
        }
    };

    validatePassword = myInput => {
        const lengthOfPass = myInput.value.length;
        if (lengthOfPass >= 4) {
            myInput.classList.remove("invalid");
            myInput.classList.add("valid");
            console.log('correct password!');
            return true
        } else {
            myInput.classList.remove("valid");
            myInput.classList.add("invalid");
            console.log('incorrect password!');
            return false
        }
    };

    validateImage = myInput => {
        const typeOfImage = myInput.type;
        if ((typeOfImage !== 'image/jpeg') || (typeOfImage !== 'image/png')) {
            myInput.classList.remove("valid");
            myInput.classList.add("invalid");
            console.log('invalid format of image!');
            return false
        } else {
            myInput.classList.remove("invalid");
            myInput.classList.add("valid");
            console.log('valid format of image!');
            return true
        }
    };
}

const submit = document.getElementsByName('submit')[0];
submit.addEventListener('click', () => {
    event.preventDefault();
    const passInput = document.getElementsByName('password')[0];
    const logInput = document.getElementsByName('login-or-email')[0];
    const avatarInput = document.getElementsByName('avatar')[0];

    const validate = new Validator(logInput, passInput);
});