import {REQUIRED, PHONE, EMAIL, TROOP} from '../common/util/validation';

const config = {

    profileType: {
        type: REQUIRED,
        message: 'Please provide student type.'
    },
    firstName: {
        type: REQUIRED,
        message: 'Please provide student first name.'
    },
    lastName:  {
        type: REQUIRED,
        message: 'Please provide student last name.'
    },
    level: {
        type: REQUIRED,
        message: 'Please provide student level (Rank or Recognition).'
    },
    unit:  [
        {
            type: REQUIRED,
            message: 'Please provide student unit (Troop or Crew Number).'
        },
        {
            type: TROOP,
            message: 'Please provide a valid unit (Troop or Crew) Number.  Ex 950 or 0950'
        }
    ],
    leaderFirstName: {
        type: REQUIRED,
        message: 'Please provide leader first name.'
    },
    leaderLastName:  {
        type: REQUIRED,
        message: 'Please provide leader last name.'
    },
    leaderEmail:  [
        {
            type: REQUIRED,
            message: 'Please provide leader e-mail.'
        },
        {
            type: EMAIL,
            message: 'Please provide a valid e-mail address.  Ex: yourEmail@yoursite.com'
        }
    ],
    leaderPhone: [
        {
            type: REQUIRED,
            message: 'Please provide leader cell number.'
        },
        {
            type: PHONE,
            message: 'Please provide a valid cell number.  Ex: (314) 333-4444'
        }
    ],
    leaderUnit: [
        {
            type: REQUIRED,
            message: 'Please provide leader unit (Troop or Crew Number).'
        },
        {
            type: TROOP,
            message: 'Please provide a valid unit (Troop or Crew) Number.  Ex 950 or 0950'
        }
    ]
};

export default config;