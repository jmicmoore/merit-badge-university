import React from 'react';
import PropTypes from 'prop-types';
import {getErrorMessageForField} from '../util/validation';

const showErrorFeedback = (message) => {
    if(message){
        return (
            <div className="invalid-feedback">
                {message}
            </div>
        );
    } else {
        return null;
    }
};

const getValidStyle = (disabled, errorMessage) => {
    if(disabled){
        return '';
    } else {
        return errorMessage ? 'invalid' : 'valid';
    }
};

class TextArea extends React.Component {

    render() {
        const propertyName = this.props.propertyName;
        const displayName = this.props.displayName;
        const inputType = this.props.inputType || 'text';
        const hidden = this.props.hidden || false;
        const placeholder = this.props.placeholder || this.props.displayName;
        const rows = this.props.rows || '3';

        const errorMessage = getErrorMessageForField(this.props.errors, propertyName);
        const validStyle = getValidStyle(this.props.disabled, errorMessage);

        if(!hidden){
            return (
                <div className="form-group">
                    <label htmlFor={propertyName}>{displayName} <span className="text-danger">*</span></label>
                    <textarea
                        rows={rows}
                        value={this.props.propertyValue}
                        className={`form-control ${validStyle}`}
                        id={propertyName}
                        placeholder={placeholder}
                        onChange={(event) => {
                            if(this.props.changeHandler) this.props.changeHandler(propertyName, event.target.value);
                        }}
                        disabled={this.props.disabled ? 'disabled' : ''}
                    />
                    {
                        showErrorFeedback(errorMessage)
                    }
                </div>
            );
        }

        return null;
    }
};

TextArea.propTypes = {
    propertyName: PropTypes.string.isRequired,
    propertyValue: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    changeHandler: PropTypes.func,
    hidden: PropTypes.bool,
    errors: PropTypes.object,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    rows: PropTypes.string
};

export default TextArea;