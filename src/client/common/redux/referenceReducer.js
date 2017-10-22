import {MERIT_BADGE_NAMES, COUNSELOR_NAMES, VENTURING_CLASSES} from '../constants';

const INITIAL_STATE = {
    meritBadgeNames: [],
    counselorNames: [],
    venturingClasses: []
};

export const referenceReducer = ( state = INITIAL_STATE, action) => {
    let newState = {...state};

    if (action.type === `${MERIT_BADGE_NAMES}_PENDING`) {
        newState.meritBadgeNames = [];
    }
    if (action.type === `${MERIT_BADGE_NAMES}_FULFILLED`) {
        newState.meritBadgeNames = action.payload.body;
    }
    if (action.type === `${MERIT_BADGE_NAMES}_REJECTED`) {
        console.log('Error getting merit badge names.');
        newState.meritBadgeNames = [];
    }


    if (action.type === `${COUNSELOR_NAMES}_PENDING`) {
        newState.counselorNames = [];
    }
    if (action.type === `${COUNSELOR_NAMES}_FULFILLED`) {
        newState.counselorNames = action.payload.body;
    }
    if (action.type === `${COUNSELOR_NAMES}_REJECTED`) {
        console.log('Error retrieving counselor names.');
        newState.counselorNames = [];
    }



    if (action.type === `${VENTURING_CLASSES}_PENDING`) {
        newState.venturingClasses = [];
    }
    if (action.type === `${VENTURING_CLASSES}_FULFILLED`) {
        newState.venturingClasses = action.payload.body;
    }
    if (action.type === `${VENTURING_CLASSES}_REJECTED`) {
        console.log('Error retrieving venturing classes.');
        newState.venturingClasses = [];
    }


    return newState;
};