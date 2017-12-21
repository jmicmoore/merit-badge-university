
export const mbuAPI = process.env.MBU_API || 'http://localhost:3099/mbu-api';

export const MERIT_BADGE_NAMES = 'reference/MERIT_BADGE_NAMES';
export const COUNSELOR_NAMES = 'reference/COUNSELOR_NAMES';
export const VENTURING_CLASS_NAMES = 'reference/VENTURING_CLASS_NAMES';

export const PROFILE_TYPES = 'profile/PROFILE_TYPES';
export const COUNCILS = 'profile/COUNCILS';
export const DISTRICTS = 'profile/DISTRICTS';
export const STATES = 'profile/STATES';

export const GET_MERIT_BADGES = 'admin/MERIT_BADGES';
export const GET_MERIT_BADGE_BY_ID = 'admin/GET_MERIT_BADGE_BY_ID';
export const GET_MERIT_BADGE_BY_NAME = 'admin/GET_MERIT_BADGE_BY_NAME';
export const UPDATE_MERIT_BADGE = 'admin/UPDATE_MERIT_BADGE';
export const ADD_CLASSROOM = 'admin/ADD_CLASSROOM';
export const GET_CLASSROOMS = 'admin/GET_CLASSROOMS';
export const DELETE_CLASSROOM = 'admin/DELETE_CLASSROOM';

export const GET_COURSES = 'admin/GET_COURSES';
export const GET_COURSE_BY_ID = 'admin/GET_COURSE_BY_ID';
export const UPDATE_COURSE = 'admin/UPDATE_COURSE';
export const DELETE_COURSE = 'admin/DELETE_COURSE';
export const RESET_CURRENT_COURSE = 'admin/RESET_CURRENT_COURSE';
export const RESET_CURRENT_MERIT_BADGE = 'admin/RESET_CURRENT_MERIT_BADGE';

export const GET_SCHEDULED_COURSES = 'admin/GET_SCHEDULED_COURSES';
export const GET_SCHEDULED_COURSE_BY_ID = 'admin/GET_SCHEDULED_COURSE_BY_ID';
export const UPDATE_SCHEDULED_COURSE = 'admin/UPDATE_SCHEDULED_COURSE';
export const DELETE_SCHEDULED_COURSE = 'admin/DELETE_SCHEDULED_COURSE';
export const RESET_CURRENT_SCHEDULED_COURSE = 'admin/RESET_CURRENT_SCHEDULED_COURSE';

export const CREATE_USER_PROFILE = 'profile/CREATE_USER_PROFILE';
export const GET_USER_PROFILE = 'profile/GET_USER_PROFILE';
export const UPDATE_USER_PROFILE = 'profile/UPDATE_USER_PROFILE';
export const RESET_PROFILE_ERROR = 'profile/RESET_PROFILE_ERROR';

export const LOGIN_USER = 'user/LOGIN_USER';
export const LOGOUT_USER = 'user/LOGOUT_USER';

const COURSE_TYPE = {
    MeritBadge: 'MeritBadge',
    Venturing: 'Venturing'
};
module.exports.COURSE_TYPE = COURSE_TYPE;

const FINISH_REGISTER = {
    MeritBadgeCounselor: '/register/counselor',
    VenturerInstructor: '/register/venturer-instructor'
};
module.exports.FINISH_REGISTER = FINISH_REGISTER;