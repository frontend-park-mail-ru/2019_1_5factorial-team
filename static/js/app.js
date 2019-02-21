'use strict';

const form = document.getElementsByClassName('form');

const validateEmail = (email) => {
    let expression = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/);
    let res = expression.test(email);
    if (res) {
        console.log('correct email!');
        return true
    }
    console.log('incorrect email!');
    return false
};

const validateLogin = (login) => {
    if (myInput.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
        console.log('correct login!');
    } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
        console.log('incorrect login!');
    }
};

const validatePassword = (password) => {
    if (myInput.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
        console.log('correct password!');
    } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
        console.log('incorrect password!');
    }
};