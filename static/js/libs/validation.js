import { EMAIL_EXPRESSION, MIN_LENGTH} from '../components/constants.js';

export default class Validator {

    /**
     * validateEmail - check validity of input email (using RegExp)
     * @param {string} email
     * @return {boolean}
     */
    static validateEmail(email) {
        return EMAIL_EXPRESSION.test(email);
    }

    /**
     * validateLogin - check validity of input login (only for length)
     * @param {string} data
     * @return {boolean}
     */
    static validateLogin(data)  {
        return data.length >= MIN_LENGTH;
    }

    /**
     * validateLogin - check validity of input login or email (only for length)
     * @param {string} data
     * @return {boolean}
     */
    static validateLoginOrEmail(data) {
        const loginInput = Validator.validateLogin(data);
        const emailInput = Validator.validateEmail(data);
        return loginInput || emailInput;
    }

    /**
     * validatePassword - check validity of input password (only for length)
     * @param {string} data
     * @return {boolean}
     */
    static validatePassword(data)  {
        return data.length >= MIN_LENGTH;
    }

    /**
     * validateImage - check validity of input image
     * @param {HTMLElement} myInput
     * @return {boolean}
     */
    static validateImage(myInput)  {
        return ((myInput.type !== 'image/jpeg') || (myInput.type !== 'image/png'));
    }

    /**
     * validateRepeatPasswords - check validity of input passwords and compare them
     * @param first
     * @param second
     * @return {boolean}
     */
    static validateRepeatPasswords(first, second)  {
        return first.value === second.value;
    }
}
