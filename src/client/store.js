import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { referenceReducer } from './common/redux/referenceReducer';
import { registerReducer } from './register/registerReducer';
import { userReducer } from './user/userReducer';
import { adminReducer } from './admin/adminReducer';

const reducers = {
    reference: referenceReducer,
    register: registerReducer,
    user: userReducer,
    admin: adminReducer
};

const store = createStore(combineReducers(reducers), applyMiddleware(promiseMiddleware()));

export default store;