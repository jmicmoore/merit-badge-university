import {isValid, REQUIRED, EMAIL, PASSWORD, SAME, PHONE, ZIP, DATE, ARRAY_MAX} from './validation';

describe('Testing validation', () => {

    test('you can have multiple configurations for the same field', () => {
        const config = {
            myField: [
                { type: REQUIRED, message: 'xxx' },
                { type: EMAIL, message: 'xxx' }
            ]
        };
        const data = {
            myField: 'mysite@ourearth.com',
        };
        const actual = isValid(data, config);

        expect(actual).toBe(true);
    });

    test('Using isOptionalIf can conditionally make validation optional.  A value of true skips validation', () => {
        const config = {
            myField: {
                type: REQUIRED,
                message: 'xxx',
                isOptionalIf: dontCare => {return true;}
            }
        };
        const data = {
            myField: ''
        };
        const actual = isValid(data, config);

        expect(actual).toBe(true);
    });

    test('Using isOptionalIf can conditionally make validation optional.  A value of false requires validation', () => {
        const config = {
            myField: {
                type: REQUIRED,
                message: 'xxx',
                isOptionalIf: dontCare => {return false;}
            }
        };
        const data = {
            myField: ''
        };
        const actual = isValid(data, config);

        expect(actual).toBe(false);
    });

    test('REQUIRED type should return true if field has non-empty value', () => {
        const config = {
            myField: {
                type: REQUIRED, message: 'xxx'
            }
        };
        const data = {
            myField: 'xyz'
        };
        const actual = isValid(data, config);

        expect(actual).toBe(true);
    });

    test('REQUIRED type should return false if field has empty value', () => {
        const config = {
            myField: {
                type: REQUIRED, message: 'xxx'
            }
        };
        const data = {
            myField: ''
        };
        const actual = isValid(data, config);

        expect(actual).toBe(false);
    });

    test('REQUIRED type should return false if field is missing', () => {
        const config = {
            myField: {
                type: REQUIRED, message: 'xxx'
            }
        };
        const data = {
            somethingElse: ''
        };
        const actual = isValid(data, config);

        expect(actual).toBe(false);
    });

    test('REQUIRED type should return true if field an array and the array has at least one element', () => {
        const config = {
            myField: {
                type: REQUIRED, message: 'xxx'
            }
        };
        const data = {
            myField: ['something']
        };
        const actual = isValid(data, config);

        expect(actual).toBe(true);
    });

    test('REQUIRED type should return false if field an array and the array has length of zero', () => {
        const config = {
            myField: {
                type: REQUIRED, message: 'xxx'
            }
        };
        const data = {
            myField: []
        };
        const actual = isValid(data, config);

        expect(actual).toBe(false);
    });

    test('SAME type should return true if fields are equal', () => {
        const config = {
            myField1: { type: REQUIRED, message: 'xxx' },
            myField2: {
                type: SAME,
                firstField: 'myField1',
                secondField: 'myField2',
                message: 'xxx'
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
            myField1: { type: REQUIRED, message: 'xxx' },
            myField2: {
                type: SAME,
                firstField: 'myField1',
                secondField: 'myField2',
                message: 'xxx'
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
            myField1: { type: REQUIRED, message: 'xxx' },
            myField2: {
                type: SAME,
                firstField: 'myField1',
                secondField: 'myField2',
                message: 'xxx'
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
                secondField: 'myField2',
                message: 'xxx'
            }
        };
        const data = {
            myField1: '',
            myField2: 'xyz',
        };
        const actual = isValid(data, config);

        expect(actual).toBe(true);
    });

    test('EMAIL type should return true if field is valid e-mail', () => {
        const config = {
            myField1: { type: EMAIL, message: 'xxx' },
            myField2: { type: EMAIL, message: 'xxx' },
            myField3: { type: EMAIL, message: 'xxx' }
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
        expect(isValid({myField: 'mysite.ourearth.com'}, {myField: { type: EMAIL, message: 'xxx' }})).toBe(false);
        expect(isValid({myField: 'mysite@.com.my'}, {myField: { type: EMAIL, message: 'xxx' }})).toBe(false);
        expect(isValid({myField: '@you.me.net'}, {myField: { type: EMAIL, message: 'xxx' }})).toBe(false);
        expect(isValid({myField: 'mysite123@gmail.b'}, {myField: { type: EMAIL, message: 'xxx' }})).toBe(false);
        expect(isValid({myField: 'mysite@.org.org'}, {myField: { type: EMAIL, message: 'xxx' }})).toBe(false);
        expect(isValid({myField: '.mysite@mysite.org'}, {myField: { type: EMAIL, message: 'xxx' }})).toBe(false);
        expect(isValid({myField: 'mysite()*@gmail.com'}, {myField: { type: EMAIL, message: 'xxx' }})).toBe(false);
        expect(isValid({myField: 'mysite..1234@yahoo.com'}, {myField: { type: EMAIL, message: 'xxx' }})).toBe(false);
    });

    test('PASSWORD type should return true if field is a valid password', () => {
        const config = {
            myField1: { type: PASSWORD, message: 'xxx' },
        };
        const data = {
            myField1: '1234567Ab%'
        };
        const actual = isValid(data, config);

        expect(actual).toBe(true);
    });

    test('PASSWORD type should return false if field is NOT a valid password', () => {
        const config = {
            myField1: { type: PASSWORD, message: 'xxx' },
        };
        const data = {
            myField1: 'nope'
        };
        const actual = isValid(data, config);

        expect(actual).toBe(false);
    });

    test('PHONE type should return true if field is valid phone number (dashes, spaces, or nothing, parenthesis optional)', () => {
        const config = {
            myField1: { type: PHONE, message: 'xxx' },
            myField2: { type: PHONE, message: 'xxx' },
            myField3: { type: PHONE, message: 'xxx' },
            myField4: { type: PHONE, message: 'xxx' },
            myField5: { type: PHONE, message: 'xxx' }
        };
        const data = {
            myField1: '(314) 333-4444',
            myField2: '314-333-4444',
            myField3: '314 333 4444',
            myField4: '(314 333-4444',
            myField5: '3143334444'
        };
        const actual = isValid(data, config);

        expect(actual).toBe(true);
    });

    test('PHONE type should return false if field is invalid phone number', () => {
        expect(isValid({myField: '314-333-44449'}, {myField: { type: PHONE, message: 'xxx' }})).toBe(false);
    });

    test('PHONE type should return false if field is invalid phone number', () => {
        expect(isValid({myField: '3149-333-4444'}, {myField: { type: PHONE, message: 'xxx' }})).toBe(false);
    });

    test('PHONE type should return false if field is invalid phone number', () => {
        expect(isValid({myField: '31-333-4444'}, {myField: { type: PHONE, message: 'xxx' }})).toBe(false);
    });

    test('PHONE type should return false if field is invalid phone number', () => {
        expect(isValid({myField: '314-3339-4444'}, {myField: { type: PHONE, message: 'xxx' }})).toBe(false);
    });

    test('PHONE type should return false if field is invalid phone number', () => {
        expect(isValid({myField: '314-33-4444'}, {myField: { type: PHONE, message: 'xxx' }})).toBe(false);
    });
    test('PHONE type should return false if field is invalid phone number', () => {
        expect(isValid({myField: '314-333-444'}, {myField: { type: PHONE, message: 'xxx' }})).toBe(false);
    });

    test('ZIP type should return true if field is a valid zip code', () => {
        const config = {
            myField: {
                type: ZIP, message: 'xxx'
            }
        };
        const data = {
            myField: '12345'
        };
        const actual = isValid(data, config);

        expect(actual).toBe(true);
    });

    test('ZIP type should return false if zip code has anything but numbers', () => {
        const config = {
            myField: {
                type: ZIP, message: 'xxx'
            }
        };
        const data = {
            myField: '12345a'
        };
        const actual = isValid(data, config);

        expect(actual).toBe(false);
    });

    test('ZIP type should return false if zip code is too long', () => {
        const config = {
            myField: {
                type: ZIP, message: 'xxx'
            }
        };
        const data = {
            myField: '123459'
        };
        const actual = isValid(data, config);

        expect(actual).toBe(false);
    });

    test('ZIP type should return false if zip code is too short', () => {
        const config = {
            myField: {
                type: ZIP, message: 'xxx'
            }
        };
        const data = {
            myField: '1234'
        };
        const actual = isValid(data, config);

        expect(actual).toBe(false);
    });

    test('DATE type should return true if field is a valid date', () => {
        const config = {
            myField: {
                type: DATE, message: 'xxx'
            }
        };
        const data = {
            myField: '05/01/2005'
        };
        const actual = isValid(data, config);

        expect(actual).toBe(true);
    });

    test('DATE type should return true if field is a valid date - can have dashes as well', () => {
        const config = {
            myField: {
                type: DATE, message: 'xxx'
            }
        };
        const data = {
            myField: '05-01-2005'
        };
        const actual = isValid(data, config);

        expect(actual).toBe(true);
    });

    test('DATE type should return false if invalid - must have 2 digit months', () => {
        expect(isValid({myField: '5/01/2005'}, {myField: {type: DATE, message: 'xxx'}})).toBe(false);
    });

    test('DATE type should return false if invalid - must have 2 digit days', () => {
        expect(isValid({myField: '05/1/2005'}, {myField: {type: DATE, message: 'xxx'}})).toBe(false);
    });

    test('DATE type should return false if invalid - missing field', () => {
        expect(isValid({myField: '05//2005'}, {myField: {type: DATE, message: 'xxx'}})).toBe(false);
    });

    test('DATE type should return false if invalid - non-numeric', () => {
        expect(isValid({myField: '05/01/2005a'}, {myField: {type: DATE, message: 'xxx'}})).toBe(false);
    });

    test('ARRAY_MAX type should return true if field has an array length equal or under max', () => {
        const config = {
            myField: {
                type: ARRAY_MAX, max: 3, message: 'xxx'
            }
        };
        const data = {
            myField: ['1', '2', '3']
        };
        const actual = isValid(data, config);

        expect(actual).toBe(true);
    });

    test('ARRAY_MAX type should return false if field has an array length over max', () => {
        const config = {
            myField: {
                type: ARRAY_MAX, max: 3, message: 'xxx'
            }
        };
        const data = {
            myField: ['1', '2', '3', '4']
        };
        const actual = isValid(data, config);

        expect(actual).toBe(false);
    });
});