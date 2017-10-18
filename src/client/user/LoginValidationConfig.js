import {REQUIRED} from '../common/util/validation';

const config = {
    userId:  [
        {
            type: REQUIRED,
            message: 'Please provide your user ID.'
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