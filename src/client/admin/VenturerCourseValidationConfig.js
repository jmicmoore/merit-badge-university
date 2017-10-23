import {REQUIRED} from '../common/util/validation';

const config = {
    venturingClass: {
        type: REQUIRED,
        message: 'Please provide the venturing class.'
    },
    recommendedLength:  {
        type: REQUIRED,
        message: 'Please provide your recommended class length.'
    },
    recommendedSize: {
        type: REQUIRED,
        message: 'Please provide your recommended number of students.'
    }
};

export default config;