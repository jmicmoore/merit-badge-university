import React from 'react';
import PropTypes from 'prop-types';
import {getErrorMessageForField} from '../util/validation';

const EMPTY_ITEM = {value: '', label: ''};

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

class SingleSelect extends React.Component {

    render(){
        const propertyName = this.props.propertyName;

        const errorMessage = getErrorMessageForField(this.props.errors, propertyName);
        const validStyle = errorMessage ? 'invalid' : 'valid';

        const options = this.props.options.slice();
        options.unshift(EMPTY_ITEM);

        return (
            <div className="form-group">
                <label htmlFor={propertyName}>{this.props.displayName} <span className="text-danger">*</span></label>
                <select
                    value={this.props.propertyValue}
                    className={`form-control form-control-lg ${validStyle}`}
                    id={propertyName}
                    onChange={(event) => {
                        this.props.changeHandler(propertyName, event.target.value);
                    }}
                >
                    {
                        options.map( item => <option key={item.value} value={item.value}>{item.label}</option>)
                    }
                </select>
                {
                    showErrorFeedback(errorMessage)
                }
            </div>
        );
    };
};

SingleSelect.propTypes = {
    propertyName: PropTypes.string.isRequired,
    propertyValue: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    changeHandler: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    errors: PropTypes.object
};

export default SingleSelect;