import {SET_REGISTER_FIELD, PROFILE_TYPES} from '../actions/constants';

const INITIAL_STATE = {
    firstNameInputRegistration: '',
    lastNameInputRegistration: '',
    inputEmailRegistration: '',
    inputEmailRegistrationConfirmation: '',
    inputPasswordRegistration: '',
    confirmInputPasswordRegistration: '',
    scoutTypeRegistration: '',
    councilRegistration: '',
    otherInputCouncilName: '',
    districtRegistration: '',
    otherInputDistrictName: '',
    profileTypes: []

};

export const registerReducer = ( state = INITIAL_STATE, action) => {
    let newState = {...state};

    if (action.type === SET_REGISTER_FIELD){
        newState[action.payload.field] = action.payload.value;
    }


    if (action.type === `${PROFILE_TYPES}_PENDING`) {
        newState.profileTypes = [];
    }
    if (action.type === `${PROFILE_TYPES}_FULFILLED`) {
        newState.profileTypes = action.payload.body;
    }
    if (action.type === `${PROFILE_TYPES}_REJECTED`) {
        console.log('Error getting lifecycle tags', action.payload);
        newState.profileTypes = [];
    }

    return newState;
};