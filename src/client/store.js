import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { registerReducer } from './register/registerReducer';
import { userReducer } from './user/userReducer';
import { meritBadgeReducer } from './meritBadge/meritBadgeReducer';
import { courseReducer } from './course/courseReducer';
import { classroomReducer } from './class/classroomReducer';
import { studentReducer } from './student/studentReducer';

const reducers = {
    register: registerReducer,
    user: userReducer,
    meritBadge: meritBadgeReducer,
    course: courseReducer,
    classroom: classroomReducer,
    student: studentReducer
};

const store = createStore(combineReducers(reducers), applyMiddleware(promiseMiddleware()));

export default store;