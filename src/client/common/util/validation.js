import _ from 'lodash';
import pwdValidation from './passwordValidation';

export const REQUIRED = 'validation/required';
export const SAME = 'validation/same';
export const EMAIL = 'validaton/email';
export const PASSWORD = 'validaton/password';

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