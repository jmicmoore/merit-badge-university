import {REQUIRED, PHONE, EMAIL, SAME, CREW} from '../common/util/validation';

const config = {
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
    crew: [
        {
            type: REQUIRED,
            message: 'Please provide your crew number.'
        },
        {
            type: CREW,
            message: 'Please provide a valid crew number.  Ex 950 or 0950'
        }
    ]
};

export default config;