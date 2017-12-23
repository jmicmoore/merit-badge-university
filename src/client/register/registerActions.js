import store from '../store';
import http from 'superagent';
import {
    mbuAPI,
    MERIT_BADGE_NAMES,
    VENTURING_CLASS_NAMES,
    PROFILE_TYPES, COUNCILS, DISTRICTS, STATES
} from './constants';

export const getMeritBadgeNames = () => {
    store.dispatch({
        type: MERIT_BADGE_NAMES,
        payload: http.get(`${mbuAPI}/merit-badge-names`)
    });
};


export const getVenturingClassNames = () => {
    store.dispatch({
        type: VENTURING_CLASS_NAMES,
        payload: http.get(`${mbuAPI}/venturing-class-names`)
    });
};

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