import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { userReducer } from './reducers/userReducer';
import { registerReducer } from './profile/registerReducer';

const reducers = {
    user: userReducer,
    register: registerReducer
};

const store = createStore(combineReducers(reducers), applyMiddleware(promiseMiddleware()));

export default store;