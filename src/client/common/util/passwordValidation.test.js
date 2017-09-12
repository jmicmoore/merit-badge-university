import {isPassword} from './passwordValidation';

describe('Testing password validation', () => {

    test('password must have min 10 chars, 1 digit, 1 uppercase, 1 lowercase, and 1 special character', () => {
        expect(isPassword('1234567Ab%')).toBe(true);
    });

    test('password cant have less than 10 chars', () => {
        expect(isPassword('234567Ab%')).toBe(false);
    });

    test('password must have an uppercase char', () => {
        expect(isPassword('1234567ab%')).toBe(false);
    });

    test('password must have a lowercase char', () => {
        expect(isPassword('1234567AB%')).toBe(false);
    });

    test('password must have a special char', () => {
        expect(isPassword('1234567Abc')).toBe(false);
    });
});