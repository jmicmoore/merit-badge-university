import {REQUIRED, EMAIL, SAME, PASSWORD} from '../common/util/validation';

const config = {
    firstName: {
        type: REQUIRED,
        message: 'Please provide your first name.'
    },
    lastName:  {
        type: REQUIRED,
        message: 'Please provide your last name.'
    },
    email:  [
        {
            type: REQUIRED,
            message: 'Please provide your e-mail.'
        },
        {
            type: EMAIL,
            message: 'Please provide a valid e-mail address.  Ex: yourEmail@yoursite.com'
        }
    ],
    emailConfirm: [
        {
            type: REQUIRED,
            message: 'Please confirm your e-mail.'
        },
        {
            type: SAME,
            firstField: 'email',
            secondField: 'emailConfirm',
            message: 'Please make sure your e-mail and confirmation both match.'
        }
    ],
    password: [
        {
            type: REQUIRED,
            message: 'Please provide your password.'
        },
        {
            type: PASSWORD,
            message: 'Please provide a password with at least 10 characters, 1 digit, 1 uppercase, 1 lowercase, and 1 special character (! @ # $ % ^ & * _ +)'
        }
    ],
    passwordConfirm: [
        {
            type: REQUIRED,
            message: 'Please confirm your password.'
        },
        {
            type: SAME,
            firstField: 'password',
            secondField: 'passwordConfirm',
            message: 'Please make sure your password and confirmation both match.'
        }
    ],
    selectedProfileType: {
        type: REQUIRED,
        message: 'Please provide your user profile type.'
    },
    selectedCouncil: {
        type: REQUIRED,
        message: 'Please provide your council.  If your council is not listed, then please select Other and enter it below.'
    },
    selectedDistrict: {
        type: REQUIRED,
        message: 'Please provide your district.  If your district is not listed, then please select Other and enter it below.'
    }
};

export default config;