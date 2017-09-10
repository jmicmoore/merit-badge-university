import {PROFILE_TYPES, COUNCILS, DISTRICTS, CREATE_PROFILE} from '../actions/constants';

const INITIAL_STATE = {
    profileTypes: [],
    councils: [],
    districts: []

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
        console.log('Error getting profileTypes', action.payload);
        newState.profileTypes = [];
    }


    if (action.type === `${COUNCILS}_PENDING`) {
        newState.councils = [];
    }
    if (action.type === `${COUNCILS}_FULFILLED`) {
        newState.councils = action.payload.body;
    }
    if (action.type === `${COUNCILS}_REJECTED`) {
        console.log('Error getting councils', action.payload);
        newState.councils = [];
    }


    if (action.type === `${DISTRICTS}_PENDING`) {
        newState.districts = [];
    }
    if (action.type === `${DISTRICTS}_FULFILLED`) {
        newState.districts = action.payload.body;
    }
    if (action.type === `${DISTRICTS}_REJECTED`) {
        console.log('Error getting districts', action.payload);
        newState.districts = [];
    }


    if (action.type === `${CREATE_PROFILE}_PENDING`) {
    }
    if (action.type === `${CREATE_PROFILE}_FULFILLED`) {
    }
    if (action.type === `${CREATE_PROFILE}_REJECTED`) {
        console.log('Error creating user profile', action.payload);
    }


    return newState;
};