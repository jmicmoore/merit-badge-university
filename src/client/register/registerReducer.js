import {
    MERIT_BADGE_NAMES,
    VENTURING_CLASS_NAMES,
    PROFILE_TYPES, COUNCILS, DISTRICTS, STATES
} from './constants';

const INITIAL_STATE = {
    meritBadgeNames: [],
    venturingClassNames: [],
    profileTypes: [],
    councils: [],
    districts: [],
    states: []
};

export const registerReducer = ( state = INITIAL_STATE, action) => {
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


    if (action.type === `${PROFILE_TYPES}_PENDING`) {
        newState.profileTypes = [];
    }
    if (action.type === `${PROFILE_TYPES}_FULFILLED`) {
        newState.profileTypes = action.payload.body;
    }
    if (action.type === `${PROFILE_TYPES}_REJECTED`) {
        console.log('Error getting profileTypes.');
        newState.profileTypes = [];
    }


    if (action.type === `${COUNCILS}_PENDING`) {
        newState.councils = [];
    }
    if (action.type === `${COUNCILS}_FULFILLED`) {
        newState.councils = action.payload.body;
    }
    if (action.type === `${COUNCILS}_REJECTED`) {
        console.log('Error getting councils.');
        newState.councils = [];
    }


    if (action.type === `${DISTRICTS}_PENDING`) {
        newState.districts = [];
    }
    if (action.type === `${DISTRICTS}_FULFILLED`) {
        newState.districts = action.payload.body;
    }
    if (action.type === `${DISTRICTS}_REJECTED`) {
        console.log('Error getting districts.');
        newState.districts = [];
    }


    if (action.type === `${STATES}_PENDING`) {
        newState.states = [];
    }
    if (action.type === `${STATES}_FULFILLED`) {
        newState.states = action.payload.body;
    }
    if (action.type === `${STATES}_REJECTED`) {
        console.log('Error getting states.');
        newState.states = [];
    }


    return newState;
};