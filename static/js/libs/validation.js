'use strict';
const EMAIL_EXPRESSION = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/);
const MAX_LENGTH = 4;

export default class Validator {

    /**
     * validateEmail - check validity of input email (using RegExp)
     * @param {string} email
     * @return {boolean}
     */
    static validateEmail(email) {
        return EMAIL_EXPRESSION.test(email) ? true : false;
    }

    /**
     * validateLogin - check validity of input login (only for length)
     * @param {string} data
     * @return {boolean}
     */
    static validateLogin(data)  {
        return data.length >= MAX_LENGTH ? true : false;
    }

    /**
     * validateLogin - check validity of input login or email (only for length)
     * @param {string} data
     * @return {boolean}
     */
    static validateLoginOrEmail(data) {
        const loginInput = Validator.validateLogin(data);
        const emailInput = Validator.validateEmail(data);
        return loginInput || emailInput ? true : false;
    }

    /**
     * validatePassword - check validity of input password (only for length)
     * @param {string} data
     * @return {boolean}
     */
    static validatePassword(data)  {
        return data.length >= MAX_LENGTH ? true : false;
    }

    /**
     * validateImage - check validity of input image
     * @param {HTMLElement} myInput
     * @return {boolean}
     */
    static validateImage(myInput)  {
        return ((myInput.type !== 'image/jpeg') || (myInput.type !== 'image/png')) ? true : false;
    }

    /**
     * validateRepeatPasswords - check validity of input passwords and compare them
     * @param first
     * @param second
     * @return {boolean}
     */
    static validateRepeatPasswords(first, second)  {
        return first.value !== second.value ? false : true;
    }
}
