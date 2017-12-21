import {
    GET_CLASSROOMS,
    GET_MERIT_BADGE_BY_NAME,
    RESET_CURRENT_MERIT_BADGE,
    GET_COURSES, GET_COURSE_BY_ID, UPDATE_COURSE, DELETE_COURSE, RESET_CURRENT_COURSE,
     GET_SCHEDULED_COURSES, GET_SCHEDULED_COURSE_BY_ID, UPDATE_SCHEDULED_COURSE, DELETE_SCHEDULED_COURSE, RESET_CURRENT_SCHEDULED_COURSE
} from './constants';

const INITIAL_STATE = {
    classrooms: [],
    currentMeritBadge: null,
    courses: [],
    scheduledCourses: [],
    currentCourse: null,
    currentScheduledCourse: null
};

export const courseReducer = ( state = INITIAL_STATE, action) => {
    let newState = {...state};


    if (action.type === `${GET_CLASSROOMS}_PENDING`) {
        newState.classrooms = [];
    }
    if (action.type === `${GET_CLASSROOMS}_FULFILLED`) {
        newState.classrooms = action.payload.body;
    }
    if (action.type === `${GET_CLASSROOMS}_REJECTED`) {
        console.log('Error getting classrooms.');
        newState.classrooms = [];
    }


    if (action.type === `${GET_MERIT_BADGE_BY_NAME}_PENDING`) {
        newState.currentMeritBadge = null;
    }
    if (action.type === `${GET_MERIT_BADGE_BY_NAME}_FULFILLED`) {
        newState.currentMeritBadge = action.payload.body;
    }
    if (action.type === `${GET_MERIT_BADGE_BY_NAME}_REJECTED`) {
        console.log('Error getting merit badge by name.');
        newState.currentMeritBadge = null;
    }


    if (action.type === RESET_CURRENT_MERIT_BADGE) {
        newState.currentMeritBadge = null;
    }


    if (action.type === `${UPDATE_COURSE}_PENDING`) {
    }
    if (action.type === `${UPDATE_COURSE}_FULFILLED`) {
    }
    if (action.type === `${UPDATE_COURSE}_REJECTED`) {
        console.log('Error updating course.');
    }


    if (action.type === `${DELETE_COURSE}_PENDING`) {
    }
    if (action.type === `${DELETE_COURSE}_FULFILLED`) {
    }
    if (action.type === `${DELETE_COURSE}_REJECTED`) {
        console.log('Error deleting course.');
    }


    if (action.type === `${GET_COURSES}_PENDING`) {
        newState.courses = [];
    }
    if (action.type === `${GET_COURSES}_FULFILLED`) {
        newState.courses = action.payload.body;
    }
    if (action.type === `${GET_COURSES}_REJECTED`) {
        console.log('Error getting courses.');
        newState.courses = [];
    }


    if (action.type === `${GET_COURSE_BY_ID}_PENDING`) {
        newState.currentCourse = null;
    }
    if (action.type === `${GET_COURSE_BY_ID}_FULFILLED`) {
        newState.currentCourse = action.payload.body;
    }
    if (action.type === `${GET_COURSE_BY_ID}_REJECTED`) {
        console.log('Error getting course by id.');
        newState.currentCourse = null;
    }


    if (action.type === RESET_CURRENT_COURSE) {
        newState.currentCourse = null;
    }


    if (action.type === `${UPDATE_SCHEDULED_COURSE}_PENDING`) {
    }
    if (action.type === `${UPDATE_SCHEDULED_COURSE}_FULFILLED`) {
    }
    if (action.type === `${UPDATE_SCHEDULED_COURSE}_REJECTED`) {
        console.log('Error saving scheduled course.');
    }


    if (action.type === `${GET_SCHEDULED_COURSES}_PENDING`) {
        newState.scheduledCourses = [];
    }
    if (action.type === `${GET_SCHEDULED_COURSES}_FULFILLED`) {
        newState.scheduledCourses = action.payload.body;
    }
    if (action.type === `${GET_SCHEDULED_COURSES}_REJECTED`) {
        console.log('Error getting scheduled courses.');
        newState.scheduledCourses = [];
    }


    if (action.type === `${DELETE_SCHEDULED_COURSE}_PENDING`) {
    }
    if (action.type === `${DELETE_SCHEDULED_COURSE}_FULFILLED`) {
    }
    if (action.type === `${DELETE_SCHEDULED_COURSE}_REJECTED`) {
        console.log('Error deleting scheduled course.');
    }


    if (action.type === `${GET_SCHEDULED_COURSE_BY_ID}_PENDING`) {
        newState.currentScheduledCourse = null;
    }
    if (action.type === `${GET_SCHEDULED_COURSE_BY_ID}_FULFILLED`) {
        newState.currentScheduledCourse = action.payload.body;
    }
    if (action.type === `${GET_SCHEDULED_COURSE_BY_ID}_REJECTED`) {
        console.log('Error getting scheduled course by id.');
        newState.currentScheduledCourse = null;
    }


    if (action.type === RESET_CURRENT_SCHEDULED_COURSE) {
        newState.currentScheduledCourse = null;
    }


    return newState;
};
