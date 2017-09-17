import store from '../store';
import http from 'superagent';
import {mbuAPI, PROFILE_TYPES, COUNCILS, DISTRICTS, CREATE_PROFILE} from '../common/constants';

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

export const createProfile = (user) => {
    store.dispatch({
        type: CREATE_PROFILE,
        payload: http.post(`${mbuAPI}/profiles`).send(user)
    });
};