import {SET_REGISTER_FIELD} from '../actions/constants';

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

};

export const registerReducer = ( state = INITIAL_STATE, action) => {
    let newState = {...state};

    if (action.type === SET_REGISTER_FIELD){
        newState[action.payload.field] = action.payload.value;
    }

    return newState;
};