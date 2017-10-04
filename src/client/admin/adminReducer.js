import {MERIT_BADGES, ADD_CLASSROOM, GET_CLASSROOMS, DELETE_CLASSROOM} from '../common/constants';

const INITIAL_STATE = {
    meritBadges: [],
    classrooms: []
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

    return newState;
};
