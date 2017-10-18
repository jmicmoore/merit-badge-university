import {REQUIRED, SAME, PASSWORD} from '../common/util/validation';

const config = {
    firstName: {
        type: REQUIRED,
        message: 'Please provide your first name.'
    },
    lastName:  {
        type: REQUIRED,
        message: 'Please provide your last name.'
    },
    userId:  {
        type: REQUIRED,
        message: 'Please provide your user ID.'
    },
    userIdConfirm: [
        {
            type: REQUIRED,
            message: 'Please confirm your user ID.'
        },
        {
            type: SAME,
            firstField: 'userId',
            secondField: 'userIdConfirm',
            message: 'Please make sure your user ID and confirmation both match.'
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
    profileType: {
        type: REQUIRED,
        message: 'Please provide your user profile type.'
    },
    council: {
        type: REQUIRED,
        message: 'Please provide your council.  If your council is not listed, then please select Other and enter it below.'
    },
    otherCouncil: {
        type: REQUIRED,
        isOptionalIf: (registerInfo) => {return registerInfo.council !== 'Other';},
        message: 'You have selected Other for your council.  Please provide your other council.'

    },
    district: {
        type: REQUIRED,
        message: 'Please provide your district.  If your district is not listed, then please select Other and enter it below.'
    },
    otherDistrict: {
        type: REQUIRED,
        isOptionalIf: (registerInfo) => {return registerInfo.district !== 'Other';},
        message: 'You have selected Other for your district.  Please provide your other district.'

    }
};

export default config;