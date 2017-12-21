import {
    GET_MERIT_BADGES, GET_MERIT_BADGE_BY_ID, UPDATE_MERIT_BADGE, DELETE_MERIT_BADGE
} from './constants';

const INITIAL_STATE = {
    meritBadges: [],
    currentMeritBadge: null,
};

export const meritBadgeReducer = ( state = INITIAL_STATE, action) => {
    let newState = {...state};

    if (action.type === `${GET_MERIT_BADGES}_PENDING`) {
        newState.meritBadges = [];
    }
    if (action.type === `${GET_MERIT_BADGES}_FULFILLED`) {
        newState.meritBadges = action.payload.body;
    }
    if (action.type === `${GET_MERIT_BADGES}_REJECTED`) {
        console.log('Error getting merit badges.');
        newState.meritBadges = [];
    }


    // if (action.type === `${GET_MERIT_BADGE_BY_ID}_PENDING`) {
    //     newState.currentMeritBadge = null;
    // }
    // if (action.type === `${GET_MERIT_BADGE_BY_ID}_FULFILLED`) {
    //     newState.currentMeritBadge = action.payload.body;
    // }
    // if (action.type === `${GET_MERIT_BADGE_BY_ID}_REJECTED`) {
    //     console.log('Error getting merit badge by id.');
    //     newState.currentMeritBadge = null;
    // }


    if (action.type === `${UPDATE_MERIT_BADGE}_PENDING`) {
    }
    if (action.type === `${UPDATE_MERIT_BADGE}_FULFILLED`) {
    }
    if (action.type === `${UPDATE_MERIT_BADGE}_REJECTED`) {
        console.log('Error updating merit badge.');
    }


    if (action.type === `${DELETE_MERIT_BADGE}_PENDING`) {
    }
    if (action.type === `${DELETE_MERIT_BADGE}_FULFILLED`) {
    }
    if (action.type === `${DELETE_MERIT_BADGE}_REJECTED`) {
        console.log('Error deleting merit badge.');
    }

    return newState;
};
