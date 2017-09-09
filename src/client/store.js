import { createStore, combineReducers } from 'redux';
import { userReducer } from './reducers/userReducer';
import { registerReducer } from './profile/registerReducer';

const reducers = {
    user: userReducer,
    register: registerReducer
};

const store = createStore(combineReducers(reducers));

export default store;