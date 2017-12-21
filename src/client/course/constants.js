
export const mbuAPI = process.env.MBU_API || 'http://localhost:3099/mbu-api';

export const GET_CLASSROOMS = 'admin/GET_CLASSROOMS';
export const GET_MERIT_BADGE_BY_NAME = 'admin/GET_MERIT_BADGE_BY_NAME';
export const RESET_CURRENT_MERIT_BADGE = 'admin/RESET_CURRENT_MERIT_BADGE';

export const GET_COURSES = 'admin/GET_COURSES';
export const GET_COURSE_BY_ID = 'admin/GET_COURSE_BY_ID';
export const UPDATE_COURSE = 'admin/UPDATE_COURSE';
export const DELETE_COURSE = 'admin/DELETE_COURSE';
export const RESET_CURRENT_COURSE = 'admin/RESET_CURRENT_COURSE';

export const GET_SCHEDULED_COURSES = 'admin/GET_SCHEDULED_COURSES';
export const GET_SCHEDULED_COURSE_BY_ID = 'admin/GET_SCHEDULED_COURSE_BY_ID';
export const UPDATE_SCHEDULED_COURSE = 'admin/UPDATE_SCHEDULED_COURSE';
export const DELETE_SCHEDULED_COURSE = 'admin/DELETE_SCHEDULED_COURSE';
export const RESET_CURRENT_SCHEDULED_COURSE = 'admin/RESET_CURRENT_SCHEDULED_COURSE';

const COURSE_TYPE = {
    MeritBadge: 'MeritBadge',
    Venturing: 'Venturing'
};
module.exports.COURSE_TYPE = COURSE_TYPE;