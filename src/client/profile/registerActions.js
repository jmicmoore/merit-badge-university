import store from '../store';
import {SET_REGISTER_FIELD} from '../actions/constants';

export const setField = (field, value) => {
    store.dispatch({
        type: SET_REGISTER_FIELD,
        payload: {field, value}
    });
};