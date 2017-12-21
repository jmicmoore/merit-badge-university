
export const mbuAPI = process.env.MBU_API || 'http://localhost:3099/mbu-api';

export const MERIT_BADGE_NAMES = 'reference/MERIT_BADGE_NAMES';
export const COUNSELOR_NAMES = 'reference/COUNSELOR_NAMES';
export const VENTURING_CLASS_NAMES = 'reference/VENTURING_CLASS_NAMES';

export const PROFILE_TYPES = 'profile/PROFILE_TYPES';
export const COUNCILS = 'profile/COUNCILS';
export const DISTRICTS = 'profile/DISTRICTS';
export const STATES = 'profile/STATES';

export const CREATE_USER_PROFILE = 'profile/CREATE_USER_PROFILE';
export const GET_USER_PROFILE = 'profile/GET_USER_PROFILE';
export const UPDATE_USER_PROFILE = 'profile/UPDATE_USER_PROFILE';
export const RESET_PROFILE_ERROR = 'profile/RESET_PROFILE_ERROR';

export const LOGIN_USER = 'user/LOGIN_USER';
export const LOGOUT_USER = 'user/LOGOUT_USER';


const FINISH_REGISTER = {
    MeritBadgeCounselor: '/register/counselor',
    VenturerInstructor: '/register/venturer-instructor'
};
module.exports.FINISH_REGISTER = FINISH_REGISTER;