import {
    GET_MERIT_BADGES, GET_MERIT_BADGE_BY_NAME, GET_MERIT_BADGE_BY_ID, RESET_CURRENT_MERIT_BADGE,
    ADD_CLASSROOM, GET_CLASSROOMS, DELETE_CLASSROOM,
    UPDATE_COURSE, DELETE_COURSE, GET_COURSES, GET_COURSE_BY_ID, RESET_CURRENT_COURSE,
    UPDATE_SCHEDULED_COURSE, GET_SCHEDULED_COURSES, DELETE_SCHEDULED_COURSE, GET_SCHEDULED_COURSE_BY_ID, RESET_CURRENT_SCHEDULED_COURSE
} from '../common/constants';

const INITIAL_STATE = {
    meritBadges: [],
    classrooms: [],
    courses: [],
    scheduledCourses: [],
    currentMeritBadge: null,
    currentCourse: null,
    currentScheduledCourse: null
};

export const adminReducer = ( state = INITIAL_STATE, action) => {
    let newState = {...state};

    if (action.type === `${GET_MERIT_BADGES}_PENDING`) {
        newState.meritBadges = [];
    }
    if (action.type === `${GET_MERIT_BADGES}_FULFILLED`) {
        newState.meritBadges = action.payload.body;
    }
    if (action.type === `${GET_MERIT_BADGES}_REJECTED`) {
        console.log('Error getting merit badges.');
        newState.meritBadges = [];
    }


    // if (action.type === `${GET_MERIT_BADGE_BY_ID}_PENDING`) {
    //     newState.currentMeritBadge = null;
    // }
    // if (action.type === `${GET_MERIT_BADGE_BY_ID}_FULFILLED`) {
    //     newState.currentMeritBadge = action.payload.body;
    // }
    // if (action.type === `${GET_MERIT_BADGE_BY_ID}_REJECTED`) {
    //     console.log('Error getting merit badge by id.');
    //     newState.currentMeritBadge = null;
    // }


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


    if (action.type === `${ADD_CLASSROOM}_PENDING`) {
    }
    if (action.type === `${ADD_CLASSROOM}_FULFILLED`) {
    }
    if (action.type === `${ADD_CLASSROOM}_REJECTED`) {
        console.log('Error saving new classroom.');
    }


    if (action.type === `${DELETE_CLASSROOM}_PENDING`) {
    }
    if (action.type === `${DELETE_CLASSROOM}_FULFILLED`) {
    }
    if (action.type === `${DELETE_CLASSROOM}_REJECTED`) {
        console.log('Error deleting classroom.');
    }


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


    if (action.type === RESET_CURRENT_MERIT_BADGE) {
        newState.currentMeritBadge = null;
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
