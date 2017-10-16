import store from '../../store';
import http from 'superagent';
import {mbuAPI, MERIT_BADGE_NAMES, COUNSELOR_NAMES} from '../constants';

export const getMeritBadgeNames = () => {
    store.dispatch({
        type: MERIT_BADGE_NAMES,
        payload: http.get(`${mbuAPI}/merit-badge-names`)
    });
};

export const getCounselorNames = () => {
    store.dispatch({
        type: COUNSELOR_NAMES,
        payload: http.get(`${mbuAPI}/counselor-names`)
    });
};
