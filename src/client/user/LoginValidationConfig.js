import {REQUIRED} from '../common/util/validation';

const config = {
    email:  [
        {
            type: REQUIRED,
            message: 'Please provide your e-mail.'
        }
    ],
    password: [
        {
            type: REQUIRED,
            message: 'Please provide your password.'
        }
    ]
};

export default config;