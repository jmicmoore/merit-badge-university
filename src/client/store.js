import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { referenceReducer } from './common/redux/referenceReducer';
import { registerReducer } from './register/registerReducer';
import { userReducer } from './user/userReducer';
import { meritBadgeReducer } from './meritBadge/meritBadgeReducer';
import { courseReducer } from './course/courseReducer';
import { classroomReducer } from './class/classroomReducer';

const reducers = {
    reference: referenceReducer,
    register: registerReducer,
    user: userReducer,
    meritBadge: meritBadgeReducer,
    course: courseReducer,
    classroom: classroomReducer,
};

const store = createStore(combineReducers(reducers), applyMiddleware(promiseMiddleware()));

export default store;