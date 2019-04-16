import { OK_VALIDATE_EMAIL, OK_VALIDATE_LOGIN, OK_VALIDATE_PASSWORD, OK_VALIDATE_AVATAR } from '../components/constants.js';
import { EMPTY_EMAIL, EMPTY_LOGIN, EMPTY_PASSWORD } from '../components/constants';
import { EMAIL_EXPRESSION, LOGIN_EXPRESSION, PASSWORD_EXPRESSION } from '../components/constants';
import { INCORRECT_EMAIL, INCORRECT_LOGIN_OR_EMAIL, INCORRECT_AVATAR_FORMAT,  INCORRECT_LOGIN, INCORRECT_PASSWORD } from '../components/constants';
import { JPEG_AVATAR_FORMAT, PNG_AVATAR_FORMAT } from '../components/constants';


export default class Validator {

    /**
     * validateEmail - check validity of input email (using RegExp)
     * @param {string} email
     * @return {string}
     */
    static validateEmail(email) {
        if (email.length === 0) {
            return EMPTY_EMAIL;
        }

        if (!EMAIL_EXPRESSION.test(email)) {
            return INCORRECT_EMAIL;
        }

        return OK_VALIDATE_EMAIL;
    }

    /**
     * validateLogin - check validity of input login (only for length)
     * @param {string} data
     * @return {string}
     */
    static validateLogin(data)  {
        if (data.length === 0) {
            return EMPTY_LOGIN;
        }

        if (!LOGIN_EXPRESSION.test(data)) {
            return INCORRECT_LOGIN;
        }

        return OK_VALIDATE_LOGIN;
    }

    /**
     * validateLogin - check validity of input login or email (only for length)
     * @param {string} data
     * @return {string}
     */
    static validateLoginOrEmail(data) {
        const loginInput = Validator.validateLogin(data);
        const emailInput = Validator.validateEmail(data);
        if (loginInput === OK_VALIDATE_LOGIN) {
            return loginInput;
        } else if (emailInput === OK_VALIDATE_EMAIL) {
            return emailInput;
        } else {
            return INCORRECT_LOGIN_OR_EMAIL;
        }
    }

    /**
     * validatePassword - check validity of input password (only for length)
     * @param {string} data
     * @return {string}
     */
    static validatePassword(data)  {
        if (data.length === 0) {
            return EMPTY_PASSWORD;
        }

        if (!PASSWORD_EXPRESSION.test(data)) {
            return INCORRECT_PASSWORD;
        }

        return OK_VALIDATE_PASSWORD;
    }

    /**
     * validateImage - check validity of input image
     * @param {HTMLElement} data
     * @return {boolean}
     */
    static validateImage(data)  {
        if (data.type !== JPEG_AVATAR_FORMAT && data.type !== PNG_AVATAR_FORMAT) {
            return INCORRECT_AVATAR_FORMAT;
        }
        return OK_VALIDATE_AVATAR;
    }
}
