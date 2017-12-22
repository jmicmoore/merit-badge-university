
export const mbuAPI = process.env.MBU_API || 'http://localhost:3099/mbu-api';

export const MERIT_BADGE_NAMES = 'reference/MERIT_BADGE_NAMES';
export const COUNSELOR_NAMES = 'reference/COUNSELOR_NAMES';
export const VENTURING_CLASS_NAMES = 'reference/VENTURING_CLASS_NAMES';

const FINISH_REGISTER = {
    MeritBadgeCounselor: '/register/counselor',
    VenturerInstructor: '/register/venturer-instructor'
};
module.exports.FINISH_REGISTER = FINISH_REGISTER;