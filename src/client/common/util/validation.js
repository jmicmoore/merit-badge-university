import _ from 'lodash';
import pwdValidation from './passwordValidation';

export const REQUIRED = 'validation/required';
export const SAME = 'validation/same';
export const EMAIL = 'validaton/email';
export const PASSWORD = 'validaton/password';
export const PHONE = 'validation/phone';
export const ZIP = 'validation/zip';
export const DATE = 'validation/date';
export const ARRAY_MAX = 'validation/array_max';
export const TROOP = 'validation/troop';

const isEmpty = (str) => {
    if(Array.isArray(str)){
        return str.length === 0;
    }
    return !str || str === '';
};

const isEmail = (str) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(str);
};

const isPassword = (str) => {
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
const isDate = (str) => {
    const re = /^(0[1-9]|1[0-2])[\/-](0[1-9]|1\d|2\d|3[01])[\/-](19|20)\d{2}$/ ;
    return re.test(str);
};

const isArrayWithinMax = (array, max) => {
    return array.length <= max;
};

const isTroop = (str) => {
    const re = /^\d{3,4}?$/;
    return re.test(str);
};

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

        if(!config.message){
            throw "Programmer error: validation config missing message!!!";
        }

        const isRequired = !config.isOptionalIf || !config.isOptionalIf(objectToValidate);

        if(isRequired){
            if(type === REQUIRED) {
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
            } else if(type === ARRAY_MAX){
                return !isArrayWithinMax(value, config.max) ? config.message : '';
            } else if(type === TROOP) {
                return !isTroop(value) ? config.message : '';
            }
        } else {
            return '';
        }
    });
};

const validate = (objectToValidate, validationConfig) => {
    const fields = _.keys(validationConfig);

    const fieldResults = fields.map( field => {
        const value = objectToValidate[field];
        let fieldConfigs = validationConfig[field];

        if(!Array.isArray(fieldConfigs)){
            fieldConfigs = [fieldConfigs];
        }

        const allMessages = getValidationMessagesForField(objectToValidate, value, fieldConfigs);
        const validationMessage = _.find(allMessages, message => !isEmpty(message));
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

const convertErrorToReport = (errorMessage, fieldName) => {
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

const getErrorMessageForField = (validationReport, fieldName) => {
    if(isEmpty(validationReport)){
        return null;
    }
    const result = _.find(validationReport.fieldResults, result => result.fieldName === fieldName);
    return result ? result.message : null;
};

const isValid = (objectToValidate, validationConfig) => {

    const report = validate(objectToValidate, validationConfig);
    return report.allValid;

};

module.exports.validate = validate;
module.exports.convertErrorToReport = convertErrorToReport;
module.exports.getErrorMessageForField = getErrorMessageForField;
module.exports.isValid = isValid;