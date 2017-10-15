import store from '../store';
import http from 'superagent';
import {mbuAPI,
    MERIT_BADGES, GET_MERIT_BADGE_BY_NAME,
    ADD_CLASSROOM, GET_CLASSROOMS, DELETE_CLASSROOM,
    UPDATE_COURSE, DELETE_COURSE, GET_COURSES, GET_COURSE_BY_ID, RESET_CURRENT_COURSE, RESET_CURRENT_MERIT_BADGE
} from '../common/constants';

export const getMeritBadges = () => {
    store.dispatch({
        type: MERIT_BADGES,
        payload: http.get(`${mbuAPI}/merit-badges`)
    });
};

export const getMeritBadgeByName = (name) => {
    return store.dispatch({
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

export const updateCourse = (course) => {
    store.dispatch({
        type: UPDATE_COURSE,
        payload: http.put(`${mbuAPI}/courses`).send(course)
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

export const getCourseById = (courseId) => {
    return store.dispatch({
        type: GET_COURSE_BY_ID,
        payload: http.get(`${mbuAPI}/courses/${courseId}`)
    }).then(({ value, action }) => {
        const course = value.body;
        return getMeritBadgeByName(course.meritBadge);
    });
};

export const resetCurrentCourse = () => {
    return store.dispatch({
        type: RESET_CURRENT_COURSE,
        payload: null
    });
};

export const resetCurrentMeritBadge = () => {
    return store.dispatch({
        type: RESET_CURRENT_MERIT_BADGE,
        payload: null
    });
};
