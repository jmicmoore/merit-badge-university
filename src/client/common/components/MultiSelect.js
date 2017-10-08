import React from 'react';
import PropTypes from 'prop-types';
import 'react-select-plus/dist/react-select-plus.css';
import Select from 'react-select-plus';

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

class MultiSelect extends React.Component {

    render(){
        const propertyName = this.props.propertyName;
        const placeholder = this.props.placeholder || this.props.displayName;

        const errorMessage = getErrorMessageForField(this.props.errors, propertyName);
        const validStyle = errorMessage ? 'invalid' : 'valid';

        const options = this.props.options;

        return (
            <div>
                <label>{this.props.displayName} <span className="text-danger">*</span></label>
                <Select
                    value={this.props.propertyValue}
                    className={`${validStyle}`}
                    id={propertyName}
                    placeholder={placeholder}
                    options={options}
                    multi={true}
                    onChange={(value) => {
                        this.props.changeHandler(propertyName, value);
                    }}
                />

                {
                    showErrorFeedback(errorMessage)
                }
            </div>
        );
    };
};

MultiSelect.propTypes = {
    propertyName: PropTypes.string.isRequired,
    propertyValue: PropTypes.array.isRequired,
    displayName: PropTypes.string.isRequired,
    changeHandler: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    placeholder: PropTypes.string,
    errors: PropTypes.object
};

export default MultiSelect;