import store from '../store';
import http from 'superagent';
import {
    mbuAPI,
    GET_STUDENTS, UPDATE_STUDENT
} from './constants';

export const updateStudent = (student) => {
    store.dispatch({
        type: UPDATE_STUDENT,
        payload: http.put(`${mbuAPI}/students`).send(student)
    }).then(() => {
        return getStudents();
    })
};

export const getStudents = () => {
    return store.dispatch({
        type: GET_STUDENTS,
        payload: http.get(`${mbuAPI}/students`)
    });
};
