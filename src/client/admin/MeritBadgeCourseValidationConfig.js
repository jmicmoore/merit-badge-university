import {REQUIRED} from '../common/util/validation';

const config = {
    meritBadge: {
        type: REQUIRED,
        message: 'Please provide the merit badge.'
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