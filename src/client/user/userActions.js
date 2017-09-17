import store from '../store';
import http from 'superagent';
import {mbuAPI, LOGIN_USER} from '../common/constants';

export const login = (user) => {
    store.dispatch({
        type: LOGIN_USER,
        payload: http.post(`${mbuAPI}/login`).send(user)
    });
};