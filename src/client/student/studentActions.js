import store from '../store';
import http from 'superagent';
import {
    mbuAPI,
    GET_STUDENTS, GET_STUDENT_BY_ID, UPDATE_STUDENT, DELETE_STUDENT, RESET_CURRENT_STUDENT,
    GET_SCHEDULED_COURSES

} from './constants';

export const getStudents = () => {
    return store.dispatch({
        type: GET_STUDENTS,
        payload: http.get(`${mbuAPI}/students`)
    });
};

export const getStudentById = (studentId) => {
    return store.dispatch({
        type: GET_STUDENT_BY_ID,
        payload: http.get(`${mbuAPI}/students/${studentId}`)
    });
};

export const updateStudent = (student) => {
    store.dispatch({
        type: UPDATE_STUDENT,
        payload: http.put(`${mbuAPI}/students`).send(student)
    }).then(() => {
        return getStudents();
    });
};

export const deleteStudent = (studentId) => {
    store.dispatch({
        type: DELETE_STUDENT,
        payload: http.delete(`${mbuAPI}/students/${studentId}`)
    }).then(() => {
        return getStudents();
    });
};

export const resetCurrentStudent = () => {
    return store.dispatch({
        type: RESET_CURRENT_STUDENT,
        payload: null
    });
};

export const getScheduledCourses = () => {
    return store.dispatch({
        type: GET_SCHEDULED_COURSES,
        payload: http.get(`${mbuAPI}/scheduled-courses`)
    });
};