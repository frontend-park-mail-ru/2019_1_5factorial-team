import { EMAIL_EXPRESSION, MIN_LENGTH, OK_VALIDATE_EMAIL, OK_VALIDATE_LOGIN, OK_VALIDATE_PASSWORD, OK_VALIDATE_AVATAR, INCORRECT_EMAIL, TOO_SHORT_LOGIN, INCORRECT_LOGIN_OR_EMAIL, TOO_SHORT_PASSWORD, INCORRECT_AVATAR_FORMAT, JPEG_AVATAR_FORMAT, PNG_AVATAR_FORMAT } from '../components/constants.js';

export default class Validator {

    /**
     * validateEmail - check validity of input email (using RegExp)
     * @param {string} email
     * @return {string}
     */
    static validateEmail(email) {
        return EMAIL_EXPRESSION.test(email) ? OK_VALIDATE_EMAIL : INCORRECT_EMAIL;
    }

    /**
     * validateLogin - check validity of input login (only for length)
     * @param {string} data
     * @return {string}
     */
    static validateLogin(data)  {
        return data.length >= MIN_LENGTH ? OK_VALIDATE_LOGIN : TOO_SHORT_LOGIN;
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
        return data.length >= MIN_LENGTH ? OK_VALIDATE_PASSWORD : TOO_SHORT_PASSWORD;
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
