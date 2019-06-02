import Validator from '../libs/validation';
import {EMPTY_PASSWORD, INCORRECT_PASSWORD, EMPTY_LOGIN, INCORRECT_LOGIN, EMPTY_EMAIL, INCORRECT_EMAIL} from '../components/constants';

test('Testing validatePassword to be empty', () => {
    const toTest = '';
    const result = Validator.validatePassword(toTest);
    expect(result).toBe(EMPTY_PASSWORD);
});

test('Testing validatePassword to be too short', () => {
    const toTest = 'pas';
    const result = Validator.validatePassword(toTest);
    expect(result).toBe(INCORRECT_PASSWORD);
});

test('Testing validatePassword to be incorrect', () => {
    const toTest = 'ЭтоМойПароль';
    const result = Validator.validatePassword(toTest);
    expect(result).toBe(INCORRECT_PASSWORD);
});

test('Testing validateLogin to be empty', () => {
    const toTest = '';
    const result = Validator.validateLogin(toTest);
    expect(result).toBe(EMPTY_LOGIN);
});

test('Testing validateLogin to be too short', () => {
    const toTest = 'pas';
    const result = Validator.validateLogin(toTest);
    expect(result).toBe(INCORRECT_LOGIN);
});

test('Testing validateLogin to be too long', () => {
    const toTest = '123qwe123qwe123qwe123';
    const result = Validator.validateLogin(toTest);
    expect(result).toBe(INCORRECT_LOGIN);
});

test('Testing validateEmail to be empty', () => {
    const toTest = '';
    const result = Validator.validateEmail(toTest);
    expect(result).toBe(EMPTY_EMAIL);
});

test('Testing validateEmail to be incorrect', () => {
    const toTest = 'test.ru';
    const result = Validator.validateEmail(toTest);
    expect(result).toBe(INCORRECT_EMAIL);
});