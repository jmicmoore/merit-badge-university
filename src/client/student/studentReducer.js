import {
    GET_STUDENTS, GET_STUDENT_BY_ID, UPDATE_STUDENT, DELETE_STUDENT, RESET_CURRENT_STUDENT
} from './constants';

const INITIAL_STATE = {
    students: [],
    currentStudent: null
};

export const studentReducer = ( state = INITIAL_STATE, action) => {
    let newState = {...state};

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

    if (action.type === `${GET_STUDENT_BY_ID}_PENDING`) {
        newState.currentStudent = null;
    }
    if (action.type === `${GET_STUDENT_BY_ID}_FULFILLED`) {
        newState.currentStudent = action.payload.body;
    }
    if (action.type === `${GET_STUDENT_BY_ID}_REJECTED`) {
        console.log('Error getting student by id.');
        newState.currentStudent = null;
    }

    if (action.type === `${UPDATE_STUDENT}_PENDING`) {
    }
    if (action.type === `${UPDATE_STUDENT}_FULFILLED`) {
    }
    if (action.type === `${UPDATE_STUDENT}_REJECTED`) {
        console.log('Error updating student.');
    }

    if (action.type === `${DELETE_STUDENT}_PENDING`) {
    }
    if (action.type === `${DELETE_STUDENT}_FULFILLED`) {
    }
    if (action.type === `${DELETE_STUDENT}_REJECTED`) {
        console.log('Error deleting student.');
    }

    if (action.type === RESET_CURRENT_STUDENT) {
        newState.currentStudent = null;
    }
    return newState;
};