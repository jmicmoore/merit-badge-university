import store from '../store';
import http from 'superagent';
import {mbuAPI, MERIT_BADGES, GET_MERIT_BADGE_BY_NAME, ADD_CLASSROOM, GET_CLASSROOMS, DELETE_CLASSROOM, ADD_CLASS, DELETE_CLASS, GET_CLASSES} from '../common/constants';

export const getMeritBadges = () => {
    store.dispatch({
        type: MERIT_BADGES,
        payload: http.get(`${mbuAPI}/merit-badges`)
    });
};

export const getMeritBadgeByName = (name) => {
    store.dispatch({
        type: GET_MERIT_BADGE_BY_NAME,
        payload: http.get(`${mbuAPI}/merit-badges/${name}`)
    });
};

export const addClassroom = (classroom) => {
    store.dispatch({
        type: ADD_CLASSROOM,
        payload: http.post(`${mbuAPI}/classrooms`).send(classroom)
    }).then(() => {
        return getClassrooms();
    });
};

export const deleteClassroom = (classroomId) => {
    store.dispatch({
        type: DELETE_CLASSROOM,
        payload: http.delete(`${mbuAPI}/classrooms/${classroomId}`)
    }).then(() => {
        return getClassrooms();
    });
};

export const getClassrooms = () => {
    return store.dispatch({
        type: GET_CLASSROOMS,
        payload: http.get(`${mbuAPI}/classrooms`)
    });
};

export const addClass = (mbuClass) => {
    store.dispatch({
        type: ADD_CLASS,
        payload: http.post(`${mbuAPI}/classes`).send(mbuClass)
    }).then(() => {
        return getClasses();
    })
};

export const deleteClass = (classId) => {
    store.dispatch({
        type: DELETE_CLASS,
        payload: http.delete(`${mbuAPI}/classes/${classId}`)
    }).then(() => {
        return getClasses();
    })
};

export const getClasses = () => {
    return store.dispatch({
        type: GET_CLASSES,
        payload: http.get(`${mbuAPI}/classes`)
    });
};