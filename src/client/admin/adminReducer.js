import {MERIT_BADGES, ADD_CLASSROOM} from '../common/constants';

const INITIAL_STATE = {
    meritBadges: [],
    classrooms: []
};

export const adminReducer = ( state = INITIAL_STATE, action) => {
    let newState = {...state};

    if (action.type === `${MERIT_BADGES}_PENDING`) {
        newState.meritBadges = [];
    }
    if (action.type === `${MERIT_BADGES}_FULFILLED`) {
        newState.meritBadges = action.payload.body;
    }
    if (action.type === `${MERIT_BADGES}_REJECTED`) {
        console.log('Error getting merit badges.');
        newState.meritBadges = [];
    }


    if (action.type === `${ADD_CLASSROOM}_PENDING`) {
    }
    if (action.type === `${ADD_CLASSROOM}_FULFILLED`) {
    }
    if (action.type === `${ADD_CLASSROOM}_REJECTED`) {
        console.log('Error saving new classroom.');
    }

    return newState;
};
