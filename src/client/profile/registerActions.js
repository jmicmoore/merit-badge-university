import store from '../store';
import http from 'superagent';
import {mbuAPI, SET_REGISTER_FIELD, PROFILE_TYPES} from '../actions/constants';

export const setField = (field, value) => {
    store.dispatch({
        type: SET_REGISTER_FIELD,
        payload: {field, value}
    });
};

export const getProfileTypes = () => {
    store.dispatch({
        type: PROFILE_TYPES,
        payload: http.get(`${mbuAPI}/profile-types`)
    });
};