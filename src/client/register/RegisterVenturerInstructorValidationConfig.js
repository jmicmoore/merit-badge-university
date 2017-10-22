import {REQUIRED, ARRAY_MAX} from '../common/util/validation';

const config = {
    timeAvailable: {
        type: REQUIRED,
        message: 'Please provide your availability.'
    },
    maxNumberOfCourses: {
        type: REQUIRED,
        message: 'Please provide how many courses you can teach.'
    },
    venturingClasses: [
        {
            type: REQUIRED,
            message: 'Please provide which venturing classes you can teach.'
        },
        {
            type: ARRAY_MAX,
            max: 4,
            message: 'Please provide 1 to 4 venturing classes.'
        },
    ]
};

export default config;