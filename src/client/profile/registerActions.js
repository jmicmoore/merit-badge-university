import store from '../store';
import http from 'superagent';
import {SET_REGISTER_FIELD, PROFILE_TYPES} from '../actions/constants';
const mbuAPI = 'http://localhost:3099/mbu-api';

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