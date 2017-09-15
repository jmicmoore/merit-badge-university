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

class TextField extends React.Component {

    render() {
        const propertyName = this.props.propertyName;
        const displayName = this.props.displayName;
        const inputType = this.props.inputType || 'text';
        const hidden = this.props.hidden || false;

        const errorMessage = getErrorMessageForField(this.props.errors, propertyName);
        const validStyle = errorMessage ? 'invalid' : 'valid';

        if(!hidden){
            return (
                <div className="form-group">
                    <label htmlFor={propertyName}>{displayName} <span className="text-danger">*</span></label>
                    <input
                        value={this.props.propertyValue}
                        type={inputType}
                        className={`form-control ${validStyle}`}
                        id={propertyName}
                        placeholder={displayName}
                        onChange={(event) => {
                            this.props.changeHandler(propertyName, event.target.value);
                        }}
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

TextField.propTypes = {
    propertyName: PropTypes.string.isRequired,
    propertyValue: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    changeHandler: PropTypes.func.isRequired,
    inputType: PropTypes.string,
    hidden: PropTypes.bool
};

export default TextField;