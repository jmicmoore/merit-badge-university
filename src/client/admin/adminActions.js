import store from '../store';
import http from 'superagent';
import {mbuAPI, MERIT_BADGES, ADD_CLASSROOM} from '../common/constants';

export const getMeritBadges = () => {
    store.dispatch({
        type: MERIT_BADGES,
        payload: http.get(`${mbuAPI}/merit-badges`)
    });
};

export const addClassroom = (classroom) => {
    store.dispatch({
        type: ADD_CLASSROOM,
        payload: http.post(`${mbuAPI}/classrooms`).send(classroom)
    });
};
