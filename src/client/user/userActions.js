import store from '../store';
import http from 'superagent';
import {
    mbuAPI,
    LOGIN_USER, LOGOUT_USER,
    GET_USER_PROFILE, CREATE_USER_PROFILE, UPDATE_USER_PROFILE
} from '../common/constants';

export const login = (user) => {
    return store.dispatch({
        type: LOGIN_USER,
        payload: http.post(`${mbuAPI}/login`).send(user)
    }).then(({ value, action }) => {
        if(action.type === `${LOGIN_USER}_FULFILLED`){
            return getUserProfile(user.userId);
        }
    });
};

export const logout = () => {
    store.dispatch({
        type: LOGOUT_USER,
        payload: http.get(`${mbuAPI}/logout`)
    });
};

export const getUserProfile = (userId) => {
    return store.dispatch({
        type: GET_USER_PROFILE,
        payload: http.get(`${mbuAPI}/profiles/${userId}`)
    });
};

export const createUserProfile = (user) => {
    store.dispatch({
        type: CREATE_USER_PROFILE,
        payload: http.post(`${mbuAPI}/register`).send(user)
    }).then(({ value, action }) => {
        if(action.type === `${CREATE_USER_PROFILE}_FULFILLED`){
            return getUserProfile(user.userId);
        }
    });
};

export const updateUserProfile = (user) => {
    store.dispatch({
        type: UPDATE_USER_PROFILE,
        payload: http.put(`${mbuAPI}/profiles`).send(user)
    }).then(({ value, action }) => {
        if(action.type === `${UPDATE_USER_PROFILE}_FULFILLED`){
            return getUserProfile(user.userId);
        }
    });
};
