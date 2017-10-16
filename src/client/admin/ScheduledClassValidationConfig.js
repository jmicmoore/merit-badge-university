import {REQUIRED} from '../common/util/validation';

const config = {

    classroom: {
        type: REQUIRED,
        message: 'Please provide the class room.'
    },
    period: {
        type: REQUIRED,
        message: 'Please provide the course period.'
    },
    courseName: {
        type: REQUIRED,
        message: 'Please provide the course.'
    },
    counselor: {
        type: REQUIRED,
        message: 'Please provide the course counselor.'
    }
};

export default config;