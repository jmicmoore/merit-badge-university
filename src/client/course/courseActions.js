import store from '../store';
import http from 'superagent';
import {mbuAPI,
    COUNSELOR_NAMES,
    GET_CLASSROOMS,
    MERIT_BADGE_NAMES,
    VENTURING_CLASS_NAMES,
    GET_MERIT_BADGE_BY_NAME,
    RESET_CURRENT_MERIT_BADGE,
    GET_COURSES, GET_COURSE_BY_ID, UPDATE_COURSE, DELETE_COURSE, RESET_CURRENT_COURSE,
    GET_SCHEDULED_COURSES, GET_SCHEDULED_COURSE_BY_ID, UPDATE_SCHEDULED_COURSE, DELETE_SCHEDULED_COURSE, RESET_CURRENT_SCHEDULED_COURSE
} from './constants';

export const getCounselorNames = () => {
    store.dispatch({
        type: COUNSELOR_NAMES,
        payload: http.get(`${mbuAPI}/counselor-names`)
    });
};

export const getClassrooms = () => {
    return store.dispatch({
        type: GET_CLASSROOMS,
        payload: http.get(`${mbuAPI}/classrooms`)
    });
};

export const getMeritBadgeNames = () => {
    store.dispatch({
        type: MERIT_BADGE_NAMES,
        payload: http.get(`${mbuAPI}/merit-badge-names`)
    });
};

export const getVenturingClassNames = () => {
    store.dispatch({
        type: VENTURING_CLASS_NAMES,
        payload: http.get(`${mbuAPI}/venturing-class-names`)
    });
};

export const getMeritBadgeByName = (name) => {
    return store.dispatch({
        type: GET_MERIT_BADGE_BY_NAME,
        payload: http.get(`${mbuAPI}/merit-badges-by-name/${name}`)
    });
};

export const resetCurrentMeritBadge = () => {
    return store.dispatch({
        type: RESET_CURRENT_MERIT_BADGE,
        payload: null
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

export const getScheduledCourses = () => {
    return store.dispatch({
        type: GET_SCHEDULED_COURSES,
        payload: http.get(`${mbuAPI}/scheduled-courses`)
    });
};

export const getScheduledCourseById = (scheduledCourseId) => {
    return store.dispatch({
        type: GET_SCHEDULED_COURSE_BY_ID,
        payload: http.get(`${mbuAPI}/scheduled-courses/${scheduledCourseId}`)
    });
};

export const updateScheduledCourse = (scheduledCourse) => {
    store.dispatch({
        type: UPDATE_SCHEDULED_COURSE,
        payload: http.put(`${mbuAPI}/scheduled-courses`).send(scheduledCourse)
    }).then(() => {
        return getScheduledCourses();
    })
};

export const deleteScheduledCourse = (scheduledCourseId) => {
    store.dispatch({
        type: DELETE_SCHEDULED_COURSE,
        payload: http.delete(`${mbuAPI}/scheduled-courses/${scheduledCourseId}`)
    }).then(() => {
        return getScheduledCourses();
    })
};


export const resetCurrentScheduledCourse = () => {
    return store.dispatch({
        type: RESET_CURRENT_SCHEDULED_COURSE,
        payload: null
    });
};