import {MERIT_BADGE_NAMES, COUNSELOR_NAMES, VENTURING_CLASS_NAMES} from '../constants';

const INITIAL_STATE = {
    meritBadgeNames: [],
    counselorNames: [],
    venturingClassNames: []
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



    if (action.type === `${VENTURING_CLASS_NAMES}_PENDING`) {
        newState.venturingClassNames = [];
    }
    if (action.type === `${VENTURING_CLASS_NAMES}_FULFILLED`) {
        newState.venturingClassNames = action.payload.body;
    }
    if (action.type === `${VENTURING_CLASS_NAMES}_REJECTED`) {
        console.log('Error retrieving venturing class names.');
        newState.venturingClassNames = [];
    }


    return newState;
};