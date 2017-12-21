import {
    ADD_CLASSROOM, GET_CLASSROOMS, DELETE_CLASSROOM,
} from './constants';

const INITIAL_STATE = {
    classrooms: [],
};

export const classroomReducer = ( state = INITIAL_STATE, action) => {
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


    return newState;
};
