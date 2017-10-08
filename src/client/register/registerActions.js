import store from '../store';
import http from 'superagent';
import {mbuAPI, PROFILE_TYPES, COUNCILS, DISTRICTS, STATES, MERIT_BADGE_NAMES, CREATE_USER_PROFILE, GET_USER_PROFILE, UPDATE_USER_PROFILE} from '../common/constants';

export const getProfileTypes = () => {
    store.dispatch({
        type: PROFILE_TYPES,
        payload: http.get(`${mbuAPI}/profile-types`)
    });
};

export const getCouncils = () => {
    store.dispatch({
        type: COUNCILS,
        payload: http.get(`${mbuAPI}/councils`)
    });
};

export const getDistricts = () => {
    store.dispatch({
        type: DISTRICTS,
        payload: http.get(`${mbuAPI}/districts`)
    });
};

export const getStates = () => {
    store.dispatch({
        type: STATES,
        payload: http.get(`${mbuAPI}/states`)
    });
};

export const getMeritBadgeNames = () => {
    store.dispatch({
        type: MERIT_BADGE_NAMES,
        payload: http.get(`${mbuAPI}/merit-badge-names`)
    });
};

export const createUserProfile = (user) => {
    store.dispatch({
        type: CREATE_USER_PROFILE,
        payload: http.post(`${mbuAPI}/profiles`).send(user)
    });
};

export const updateUserProfile = (user) => {
    store.dispatch({
        type: UPDATE_USER_PROFILE,
        payload: http.put(`${mbuAPI}/profiles`).send(user)
    });
};

export const getUserProfile = (email) => {
    store.dispatch({
        type: GET_USER_PROFILE,
        payload: http.get(`${mbuAPI}/profiles/${email}`)
    });
};