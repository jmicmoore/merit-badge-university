import {
    GET_STUDENTS, UPDATE_STUDENT
} from './constants';

const INITIAL_STATE = {
    students: []
};

export const studentReducer = ( state = INITIAL_STATE, action) => {
    let newState = {...state};

    if (action.type === `${UPDATE_STUDENT}_PENDING`) {
    }
    if (action.type === `${UPDATE_STUDENT}_FULFILLED`) {
    }
    if (action.type === `${UPDATE_STUDENT}_REJECTED`) {
        console.log('Error updating student.');
    }


    if (action.type === `${GET_STUDENTS}_PENDING`) {
        newState.students = [];
    }
    if (action.type === `${GET_STUDENTS}_FULFILLED`) {
        newState.students = action.payload.body;
    }
    if (action.type === `${GET_STUDENTS}_REJECTED`) {
        console.log('Error getting students.');
        newState.students = [];
    }

    return newState;
};