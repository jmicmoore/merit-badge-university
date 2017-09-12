import {isValid, REQUIRED, EMAIL, PASSWORD, SAME} from './validation';

describe('Testing validation', () => {

    test('REQUIRED type should return true if field has non-empty value', () => {
        const config = {
            myField: { type: REQUIRED }
        };
        const data = {
            myField: 'xyz'
        };
        const actual = isValid(data, config);

        expect(actual).toBe(true);
    });

    test('REQUIRED type should return false if field has empty value', () => {
        const config = {
            myField: { type: REQUIRED }
        };
        const data = {
            myField: ''
        };
        const actual = isValid(data, config);

        expect(actual).toBe(false);
    });

    test('REQUIRED type should return false if field is missing', () => {
        const config = {
            myField: { type: REQUIRED }
        };
        const data = {
            somethingElse: ''
        };
        const actual = isValid(data, config);

        expect(actual).toBe(false);
    });

    test('EMAIL type should return true if field is valid e-mail', () => {
        const config = {
            myField1: { type: EMAIL },
            myField2: { type: EMAIL },
            myField3: { type: EMAIL }
        };
        const data = {
            myField1: 'mysite@ourearth.com',
            myField2: 'my.ownsite@ourearth.org',
            myField3: 'mysite@you.me.net'
        };
        const actual = isValid(data, config);

        expect(actual).toBe(true);
    });

    test('EMAIL type should return false if field is invalid e-mail', () => {
        expect(isValid({myField: 'mysite.ourearth.com'}, {myField: { type: EMAIL }})).toBe(false);
        expect(isValid({myField: 'mysite@.com.my'}, {myField: { type: EMAIL }})).toBe(false);
        expect(isValid({myField: '@you.me.net'}, {myField: { type: EMAIL }})).toBe(false);
        expect(isValid({myField: 'mysite123@gmail.b'}, {myField: { type: EMAIL }})).toBe(false);
        expect(isValid({myField: 'mysite@.org.org'}, {myField: { type: EMAIL }})).toBe(false);
        expect(isValid({myField: '.mysite@mysite.org'}, {myField: { type: EMAIL }})).toBe(false);
        expect(isValid({myField: 'mysite()*@gmail.com'}, {myField: { type: EMAIL }})).toBe(false);
        expect(isValid({myField: 'mysite..1234@yahoo.com'}, {myField: { type: EMAIL }})).toBe(false);
    });

    test('EMAIL type is optional - should return true if missing', () => {
        const config = {
            myField1: { type: EMAIL },
        };
        const data = {
            somethingElse: ''
        };
        const actual = isValid(data, config);

        expect(actual).toBe(true);
    });

    test('PASSWORD type should return true if field is a valid password', () => {
        const config = {
            myField1: { type: PASSWORD },
        };
        const data = {
            myField1: '1234567Ab%'
        };
        const actual = isValid(data, config);

        expect(actual).toBe(true);
    });

    test('PASSWORD type should return false if field is NOT a valid password', () => {
        const config = {
            myField1: { type: PASSWORD },
        };
        const data = {
            myField1: 'nope'
        };
        const actual = isValid(data, config);

        expect(actual).toBe(false);
    });

    test('PASSWORD type is optional - should return true if missing', () => {
        const config = {
            myField1: { type: PASSWORD },
        };
        const data = {
            somethingElse: ''
        };
        const actual = isValid(data, config);

        expect(actual).toBe(true);
    });

    test('SAME type should return true if fields are equal', () => {
        const config = {
            myField1: { type: REQUIRED },
            myField2: {
                type: SAME,
                firstField: 'myField1',
                secondField: 'myField2'
            }
        };
        const data = {
            myField1: 'xyz',
            myField2: 'xyz',
        };
        const actual = isValid(data, config);

        expect(actual).toBe(true);
    });

    test('SAME type should return false if fields are NOT equal', () => {
        const config = {
            myField1: { type: REQUIRED },
            myField2: {
                type: SAME,
                firstField: 'myField1',
                secondField: 'myField2'
            }
        };
        const data = {
            myField1: 'abc',
            myField2: 'xyz',
        };
        const actual = isValid(data, config);

        expect(actual).toBe(false);
    });

    test('SAME type is optional - should return true if one or the other fields are missing', () => {
        const config = {
            myField1: { type: REQUIRED },
            myField2: {
                type: SAME,
                firstField: 'myField1',
                secondField: 'myField2'
            }
        };
        const data = {
            myField1: 'abc',
            myField2: '',
        };
        const actual = isValid(data, config);

        expect(actual).toBe(true);
    });
    test('SAME type is optional - should return true if one or the other fields are missing', () => {
        const config = {
            myField2: {
                type: SAME,
                firstField: 'myField1',
                secondField: 'myField2'
            }
        };
        const data = {
            myField1: '',
            myField2: 'xyz',
        };
        const actual = isValid(data, config);

        expect(actual).toBe(true);
    });

    test('you can have multiple configurations for the same field', () => {
        const config = {
            myField: [
                { type: REQUIRED },
                { type: EMAIL }
            ]
        };
        const data = {
            myField: 'mysite@ourearth.com',
        };
        const actual = isValid(data, config);

        expect(actual).toBe(true);
    });
});