import {MERIT_BADGES, GET_MERIT_BADGE_BY_NAME, ADD_CLASSROOM, GET_CLASSROOMS, DELETE_CLASSROOM, ADD_CLASS, DELETE_CLASS, GET_CLASSES} from '../common/constants';

const INITIAL_STATE = {
    meritBadges: [],
    currentMeritBadge: null,
    classrooms: [],
    classes: []
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


    if (action.type === `${ADD_CLASS}_PENDING`) {
    }
    if (action.type === `${ADD_CLASS}_FULFILLED`) {
    }
    if (action.type === `${ADD_CLASS}_REJECTED`) {
        console.log('Error saving new class.');
    }


    if (action.type === `${DELETE_CLASS}_PENDING`) {
    }
    if (action.type === `${DELETE_CLASS}_FULFILLED`) {
    }
    if (action.type === `${DELETE_CLASS}_REJECTED`) {
        console.log('Error deleting class.');
    }


    if (action.type === `${GET_CLASSES}_PENDING`) {
        newState.classes = [];
    }
    if (action.type === `${GET_CLASSES}_FULFILLED`) {
        newState.classes = action.payload.body;
    }
    if (action.type === `${GET_CLASSES}_REJECTED`) {
        console.log('Error getting classes.');
        newState.classes = [];
    }


    return newState;
};
