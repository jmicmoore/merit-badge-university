
export const mbuAPI = process.env.MBU_API || 'http://localhost:3099/mbu-api';

export const COUNSELOR_NAMES = 'course/COUNSELOR_NAMES';
export const GET_CLASSROOMS = 'course/GET_CLASSROOMS';
export const MERIT_BADGE_NAMES = 'course/MERIT_BADGE_NAMES';
export const VENTURING_CLASS_NAMES = 'course/VENTURING_CLASS_NAMES';
export const GET_MERIT_BADGE_BY_NAME = 'course/GET_MERIT_BADGE_BY_NAME';
export const RESET_CURRENT_MERIT_BADGE = 'course/RESET_CURRENT_MERIT_BADGE';

export const GET_COURSES = 'course/GET_COURSES';
export const GET_COURSE_BY_ID = 'course/GET_COURSE_BY_ID';
export const UPDATE_COURSE = 'course/UPDATE_COURSE';
export const DELETE_COURSE = 'course/DELETE_COURSE';
export const RESET_CURRENT_COURSE = 'course/RESET_CURRENT_COURSE';

export const GET_SCHEDULED_COURSES = 'course/GET_SCHEDULED_COURSES';
export const GET_SCHEDULED_COURSE_BY_ID = 'course/GET_SCHEDULED_COURSE_BY_ID';
export const UPDATE_SCHEDULED_COURSE = 'course/UPDATE_SCHEDULED_COURSE';
export const DELETE_SCHEDULED_COURSE = 'course/DELETE_SCHEDULED_COURSE';
export const RESET_CURRENT_SCHEDULED_COURSE = 'course/RESET_CURRENT_SCHEDULED_COURSE';

const COURSE_TYPE = {
    MeritBadge: 'MeritBadge',
    Venturing: 'Venturing'
};
module.exports.COURSE_TYPE = COURSE_TYPE;