import {LOGIN_USER, LOGOUT_USER} from '../common/constants';

const INITIAL_STATE = {
    isAuthenticated: false,
    profile: null,
    loginError: ''
};

export const userReducer = ( state = INITIAL_STATE, action) => {
    let newState = {...state};

    if (action.type === `${LOGIN_USER}_PENDING`) {
        newState.isAuthenticated = false;
        newState.profile = null;
        newState.loginError = ''
    }
    if (action.type === `${LOGIN_USER}_FULFILLED`) {
        newState.isAuthenticated = true;
        newState.profile = action.payload.body;
    }
    if (action.type === `${LOGIN_USER}_REJECTED`) {
        newState.loginError = 'Either e-mail or password was incorrect';
    }


    if (action.type === LOGOUT_USER) {
        newState.isAuthenticated = false;
        newState.profile = null;
        newState.loginError = ''
    }


    return newState;
};