import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { registerReducer } from './register/registerReducer';

const reducers = {
    register: registerReducer
};

const store = createStore(combineReducers(reducers), applyMiddleware(promiseMiddleware()));

export default store;