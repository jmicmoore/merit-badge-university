import _ from 'lodash';
import pwdValidation from './passwordValidation';

export const REQUIRED = 'validation/required';
export const SAME = 'validation/same';
export const EMAIL = 'validaton/email';
export const PASSWORD = 'validaton/password';
export const PHONE = 'validation/phone';
export const ZIP = 'validation/zip';
export const DATE = 'validation/date';

const isEmpty = (str) => {
    return _.isEmpty(str);
};

const isEmail = (str) => {
    if(isEmpty(str)){
        return true;
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(str);
};

const isPassword = (str) => {
    if(_.isEmpty(str)){
        return true;
    }
    return pwdValidation.isPassword(str);
};

const isPhoneNumber = (str) => {
    const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return re.test(str);
};

const isZipCode = (str) => {
    const re = /^\d{5}?$/;
    return re.test(str);
};

// Tests between 1900 and 2099
function isDate(str) {
    const re = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/ ;
    return re.test(str);
}

const areFieldsSame = (object, fieldConfig) => {
    if(isEmpty(object[fieldConfig.firstField]) || isEmpty(object[fieldConfig.secondField])){
        return true;
    }
    return object[fieldConfig.firstField] === object[fieldConfig.secondField];
};

const getValidationMessagesForField = (objectToValidate, value, fieldConfigs) => {
    return fieldConfigs.map( config => {
        if(!config.type){
            throw 'Invalid configuration:  Missing type for "' + field + '".';
        }
        const type = config.type;

        if(type === REQUIRED){
            return isEmpty(value) ? config.message : '';
        } else if(type === EMAIL) {
            return !isEmail(value) ? config.message : '';
        } else if(type === PHONE) {
            return !isPhoneNumber(value) ? config.message : '';
        } else if(type === ZIP) {
            return !isZipCode(value) ? config.message : '';
        } else if(type === DATE) {
            return !isDate(value) ? config.message : '';
        } else if(type === PASSWORD){
            return !isPassword(value) ? config.message : '';
        } else if(type === SAME){
            return !areFieldsSame(objectToValidate, config) ? config.message : '';
        }
    });
};

module.exports.validate = (objectToValidate, validationConfig) => {
    const fields = _.keys(validationConfig);

    const fieldResults = fields.map( field => {
        const value = objectToValidate[field];
        let fieldConfigs = validationConfig[field];

        if(!Array.isArray(fieldConfigs)){
            fieldConfigs = [fieldConfigs];
        }

        const allMessages = getValidationMessagesForField(objectToValidate, value, fieldConfigs);
        const validationMessage = _.find(allMessages, message => !_.isEmpty(message));
        return {
            fieldName: field,
            valid: !validationMessage,
            message: validationMessage
        }
    });

    const report = {
        allValid: _.every(fieldResults, 'valid'),
        fieldResults: fieldResults
    };

    return report;
};

module.exports.convertErrorToReport = (errorMessage, fieldName) => {
    if(!errorMessage){
        return null;
    }
    return {
        allValid: false,
        fieldResults: [
            {
                fieldName,
                valid: false,
                message: errorMessage
            }
        ]
    };
};

module.exports.getErrorMessageForField = (validationReport, fieldName) => {
    if(_.isEmpty(validationReport)){
        return null;
    }
    const result = _.find(validationReport.fieldResults, result => result.fieldName === fieldName);
    return result ? result.message : null;
};

module.exports.isValid = (objectToValidate, validationConfig) => {
    const fields = _.keys(validationConfig);

    const result = _.reduce(fields, (valid, field) => {
        const value = objectToValidate[field];
        let fieldConfigs = validationConfig[field];

        if(!Array.isArray(fieldConfigs)){
            fieldConfigs = [fieldConfigs];
        }

        const fieldResult = _.reduce(fieldConfigs, (fieldValid, fieldConfig) => {
            if(!fieldConfig.type){
                throw 'Invalid configuration:  Missing type for "' + field + '".';
            }

            if(fieldConfig.type === REQUIRED){
                return fieldValid && !isEmpty(value);
            } else if(fieldConfig.type === EMAIL) {
                return fieldValid && isEmail(value);
            } else if(fieldConfig.type === PHONE) {
                return fieldValid && isPhoneNumber(value);
            } else if(fieldConfig.type === ZIP) {
                return fieldValid && isZipCode(value);
            } else if(fieldConfig.type === DATE) {
                return fieldValid && isDate(value);
            } else if(fieldConfig.type === PASSWORD){
                return fieldValid && isPassword(value);
            } else if(fieldConfig.type === SAME){
                return fieldValid && areFieldsSame(objectToValidate, fieldConfig);
            }
        }, true);

        return valid && fieldResult;

    }, true);
    return result;
};