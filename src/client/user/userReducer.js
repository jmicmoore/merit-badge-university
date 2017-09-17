import {LOGIN_USER} from '../common/constants';

const INITIAL_STATE = {
    isAuthenticated: false,
    user: null,
    loginError: ''
};

export const userReducer = ( state = INITIAL_STATE, action) => {
    let newState = {...state};

    if (action.type === `${LOGIN_USER}_PENDING`) {
        newState.isAuthenticated = false;
        newState.user = null;
        newState.loginError = ''
    }
    if (action.type === `${LOGIN_USER}_FULFILLED`) {
        newState.isAuthenticated = true;
        newState.profile = action.payload.body;
    }
    if (action.type === `${LOGIN_USER}_REJECTED`) {
        newState.loginError = 'Either e-mail or password was incorrect';
    }

    return newState;
};