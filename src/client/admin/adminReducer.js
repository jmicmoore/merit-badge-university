import {MERIT_BADGES} from '../common/constants';

const INITIAL_STATE = {
    meritBadges: []
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

    return newState;
};
