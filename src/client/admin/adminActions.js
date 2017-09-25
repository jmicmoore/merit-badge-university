import store from '../store';
import http from 'superagent';
import {mbuAPI, MERIT_BADGES} from '../common/constants';

export const getMeritBadges = () => {
    store.dispatch({
        type: MERIT_BADGES,
        payload: http.get(`${mbuAPI}/merit-badges`)
    });
};
