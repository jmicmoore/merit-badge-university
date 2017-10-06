import {REQUIRED, EMAIL, PHONE, ZIP, DATE} from '../common/util/validation';

const config = {
    address: {
        type: REQUIRED,
        message: 'Please provide your address.'
    },
    city:  {
        type: REQUIRED,
        message: 'Please provide your city.'
    },
    selectedState:  {
        type: REQUIRED,
        message: 'Please provide your state.'
    },
    zip:  [
        {
            type: REQUIRED,
            message: 'Please provide your zip code.'
        },
        {
            type: ZIP,
            message: 'Please provide a valid zip code.  Ex:  12345'
        }
    ],
    phone:  [
        {
            type: REQUIRED,
            message: 'Please provide your phone number.'
        },
        {
            type: PHONE,
            message: 'Please provide a valid phone number.  Ex: (314) 333-4444'
        }
    ],
    ypTrainingDate:  [
        {
            type: REQUIRED,
            message: 'Please provide your Youth Protection Training date.'
        },
        {
            type: DATE,
            message: 'Please provide a valid Youth Protection Training date.  Ex: MM/DD/YYYY'
        }
    ]
};

export default config;