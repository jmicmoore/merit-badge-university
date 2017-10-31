import {
    LOGIN_USER, LOGOUT_USER,
    GET_USER_PROFILE, CREATE_USER_PROFILE, UPDATE_USER_PROFILE, RESET_PROFILE_ERROR
} from '../common/constants';

const INITIAL_STATE = {
    userId: '',
    profile: null,
    isAuthenticated: false,
    loginError: '',
    createProfileError: ''
};

export const userReducer = ( state = INITIAL_STATE, action) => {
    let newState = {...state};

    if (action.type === `${LOGIN_USER}_PENDING`) {
        newState.isAuthenticated = false;
        newState.userId = '';
        newState.loginError = '';
    }
    if (action.type === `${LOGIN_USER}_FULFILLED`) {
        newState.isAuthenticated = true;
        newState.userId = action.payload.body.userId;
    }
    if (action.type === `${LOGIN_USER}_REJECTED`) {
        newState.loginError = 'Either e-mail or password was incorrect';
    }


    if (action.type === `${LOGOUT_USER}_PENDING`) {
        newState.userId = '';
        newState.isAuthenticated = false;
        newState.profile = null;
    }
    if (action.type === `${LOGOUT_USER}_FULFILLED`) {
    }
    if (action.type === `${LOGOUT_USER}_REJECTED`) {
    }


    if (action.type === `${GET_USER_PROFILE}_PENDING`) {
        newState.profile = null;
    }
    if (action.type === `${GET_USER_PROFILE}_FULFILLED`) {
        newState.profile = action.payload.body;
    }
    if (action.type === `${GET_USER_PROFILE}_REJECTED`) {
        console.log('Error retrieving user profile.');
        newState.profile = null;
    }


    if (action.type === `${CREATE_USER_PROFILE}_PENDING`) {
        newState.createProfileError = '';
    }
    if (action.type === `${CREATE_USER_PROFILE}_FULFILLED`) {
    }
    if (action.type === `${CREATE_USER_PROFILE}_REJECTED`) {
        newState.createProfileError = action.payload.response.text;
        console.log('Error creating user profile.');
    }


    if (action.type === `${UPDATE_USER_PROFILE}_PENDING`) {
    }
    if (action.type === `${UPDATE_USER_PROFILE}_FULFILLED`) {
    }
    if (action.type === `${UPDATE_USER_PROFILE}_REJECTED`) {
        console.log('Error updating user profile.');
    }


    if (action.type === RESET_PROFILE_ERROR) {
        newState.createProfileError = '';
    }


    return newState;
};