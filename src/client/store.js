import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { registerReducer } from './register/registerReducer';
import { userReducer } from './user/userReducer';
import { adminReducer } from './admin/adminReducer';

const reducers = {
    register: registerReducer,
    user: userReducer,
    admin: adminReducer
};

const store = createStore(combineReducers(reducers), applyMiddleware(promiseMiddleware()));

export default store;