'use strict';

class Validator {

    validateUser = (user, pass) => {
        if (this.validateEmail(user)) {
            if (this.validatePassword(pass)) {
                console.log('enter');
                return true;
            }
        } else if (this.validateLogin(user)) {
            if (this.validatePassword(pass)) {
                console.log('enter');
                return true;
            }
        } else {
            console.log('ploho');
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

    validateLogin = login => {
        const myInput = document.getElementsByName('login-or-email');
        if (login.length >= 8) {
            // length.classList.remove("invalid");
            // length.classList.add("valid");
            console.log('correct login!');
            return true
        } else {
            // length.classList.remove("valid");
            // length.classList.add("invalid");
            console.log('incorrect login!');
            return false
        }
    };

    validatePassword = password => {
        const myInput = document.getElementsByName('password');
        if (password.length >= 8) {
            // length.classList.remove("invalid");
            // length.classList.add("valid");
            console.log('correct password!');
            return true
        } else {
            // length.classList.remove("valid");
            // length.classList.add("invalid");
            console.log('incorrect password!');
            return false
        }
    };
}

