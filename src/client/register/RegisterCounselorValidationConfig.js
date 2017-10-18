import {REQUIRED, PHONE, ZIP, EMAIL, DATE, SAME, ARRAY_MAX} from '../common/util/validation';

const config = {
    address: {
        type: REQUIRED,
        message: 'Please provide your address.'
    },
    city: {
        type: REQUIRED,
        message: 'Please provide your city.'
    },
    state: {
        type: REQUIRED,
        message: 'Please provide your state.'
    },
    zip: [
        {
            type: REQUIRED,
            message: 'Please provide your zip code.'
        },
        {
            type: ZIP,
            message: 'Please provide a valid zip code.  Ex:  12345'
        }
    ],
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
    phone: [
        {
            type: REQUIRED,
            message: 'Please provide your cell number.'
        },
        {
            type: PHONE,
            message: 'Please provide a valid cell number.  Ex: (314) 333-4444'
        }
    ],
    contactMethods: {
        type: REQUIRED,
        message: 'Please provide your preferred contact methods in order.'
    },
    ypTrainingDate: [
        {
            type: REQUIRED,
            isOptionalIf: (counselorInfo) => {return !counselorInfo.youthProtectionTrained},
            message: 'Please provide your Youth Protection Training date.'
        },
        {
            type: DATE,
            isOptionalIf: (counselorInfo) => {return !counselorInfo.youthProtectionTrained},
            message: 'Please provide a valid Youth Protection Training date.  Ex: MM/DD/YYYY'
        }
    ],
    timeAvailable: {
        type: REQUIRED,
        message: 'Please provide your availability.'
    },
    maxNumberOfCourses: {
        type: REQUIRED,
        message: 'Please provide how many courses you can teach.'
    },
    meritBadges: [
        {
            type: REQUIRED,
            message: 'Please provide which merit badges you can teach.'
        },
        {
            type: ARRAY_MAX,
            max: 4,
            message: 'Please provide 1 to 4 merit badges.'
        },
    ]
};

export default config;