import {PROFILE_TYPES, COUNCILS, DISTRICTS, STATES, MERIT_BADGE_NAMES, CREATE_USER_PROFILE, GET_USER_PROFILE, UPDATE_USER_PROFILE} from '../common/constants';

const INITIAL_STATE = {
    profileTypes: [],
    councils: [],
    districts: [],
    states: [],
    meritBadgeNames: [],
    userProfile: null
};

export const registerReducer = ( state = INITIAL_STATE, action) => {
    let newState = {...state};

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


    if (action.type === `${CREATE_USER_PROFILE}_PENDING`) {
    }
    if (action.type === `${CREATE_USER_PROFILE}_FULFILLED`) {
    }
    if (action.type === `${CREATE_USER_PROFILE}_REJECTED`) {
        console.log('Error creating user profile.');
    }


    if (action.type === `${UPDATE_USER_PROFILE}_PENDING`) {
    }
    if (action.type === `${UPDATE_USER_PROFILE}_FULFILLED`) {
    }
    if (action.type === `${UPDATE_USER_PROFILE}_REJECTED`) {
        console.log('Error updating user profile.');
    }


    if (action.type === `${GET_USER_PROFILE}_PENDING`) {
        newState.userProfile = null;
    }
    if (action.type === `${GET_USER_PROFILE}_FULFILLED`) {
        newState.userProfile = action.payload.body;
    }
    if (action.type === `${GET_USER_PROFILE}_REJECTED`) {
        console.log('Error retrieving user profile.');
        newState.userProfile = null;
    }


    return newState;
};