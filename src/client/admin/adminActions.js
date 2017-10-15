import store from '../store';
import http from 'superagent';
import {mbuAPI, MERIT_BADGES, GET_MERIT_BADGE_BY_NAME, ADD_CLASSROOM, GET_CLASSROOMS, DELETE_CLASSROOM, ADD_COURSE, DELETE_COURSE, GET_COURSES} from '../common/constants';

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

export const addCourse = (course) => {
    store.dispatch({
        type: ADD_COURSE,
        payload: http.post(`${mbuAPI}/courses`).send(course)
    }).then(() => {
        return getCourses();
    })
};

export const deleteCourse = (courseId) => {
    store.dispatch({
        type: DELETE_COURSE,
        payload: http.delete(`${mbuAPI}/courses/${courseId}`)
    }).then(() => {
        return getCourses();
    })
};

export const getCourses = () => {
    return store.dispatch({
        type: GET_COURSES,
        payload: http.get(`${mbuAPI}/courses`)
    });
};