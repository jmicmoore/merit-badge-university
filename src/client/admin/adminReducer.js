import {MERIT_BADGES, GET_MERIT_BADGE_BY_NAME, ADD_CLASSROOM, GET_CLASSROOMS, DELETE_CLASSROOM, ADD_COURSE, DELETE_COURSE, GET_COURSES} from '../common/constants';

const INITIAL_STATE = {
    meritBadges: [],
    currentMeritBadge: null,
    classrooms: [],
    courses: []
};

export const adminReducer = ( state = INITIAL_STATE, action) => {
    let newState = {...state};

    if (action.type === `${MERIT_BADGES}_PENDING`) {
        newState.meritBadges = [];
    }
    if (action.type === `${MERIT_BADGES}_FULFILLED`) {
        newState.meritBadges = action.payload.body;
    }
    if (action.type === `${MERIT_BADGES}_REJECTED`) {
        console.log('Error getting merit badges.');
        newState.meritBadges = [];
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


    if (action.type === `${ADD_COURSE}_PENDING`) {
    }
    if (action.type === `${ADD_COURSE}_FULFILLED`) {
    }
    if (action.type === `${ADD_COURSE}_REJECTED`) {
        console.log('Error saving new course.');
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


    return newState;
};
