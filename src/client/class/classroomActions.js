import store from '../store';
import http from 'superagent';
import {mbuAPI,
    ADD_CLASSROOM, GET_CLASSROOMS, DELETE_CLASSROOM,
} from './constants';


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