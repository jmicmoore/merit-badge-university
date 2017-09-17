import {LOGIN_USER} from '../common/constants';

const INITIAL_STATE = {
    loginError: ''
};

export const userReducer = ( state = INITIAL_STATE, action) => {
    let newState = {...state};

    if (action.type === `${LOGIN_USER}_PENDING`) {
        newState.loginError = ''
    }
    if (action.type === `${LOGIN_USER}_FULFILLED`) {
    }
    if (action.type === `${LOGIN_USER}_REJECTED`) {
        newState.loginError = 'Either e-mail or password was incorrect';
    }

    return newState;
};