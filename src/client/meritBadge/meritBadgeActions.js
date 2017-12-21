import store from '../store';
import http from 'superagent';
import {mbuAPI,
    GET_MERIT_BADGES, GET_MERIT_BADGE_BY_ID, UPDATE_MERIT_BADGE, DELETE_MERIT_BADGE
} from './constants';

export const getMeritBadges = () => {
    return store.dispatch({
        type: GET_MERIT_BADGES,
        payload: http.get(`${mbuAPI}/merit-badges`)
    });
};


export const updateMeritBadge = (meritBadge) => {
    store.dispatch({
        type: UPDATE_MERIT_BADGE,
        payload: http.put(`${mbuAPI}/merit-badges`).send(meritBadge)
    }).then(() => {
        return getMeritBadges();
    })
};

export const deleteMeritBadge = (meritBadgeId) => {
    store.dispatch({
        type: DELETE_MERIT_BADGE,
        payload: http.delete(`${mbuAPI}/merit-badges/${meritBadgeId}`)
    }).then(() => {
        return getMeritBadges();
    })
};

// export const getMeritBadgeById = (id) => {
//     store.dispatch({
//         type: GET_MERIT_BADGE_BY_ID,
//         payload: http.get(`${mbuAPI}/merit-badges/${id}`)
//     });
// };
