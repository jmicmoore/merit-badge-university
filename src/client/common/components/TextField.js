import React from 'react';
import PropTypes from 'prop-types';

class TextField extends React.Component {

    render() {
        const propertyName = this.props.propertyName;
        const propertyValue = this.props.propertyValue;
        const displayName = this.props.displayName;
        const changeHandler = this.props.changeHandler;
        const inputType = this.props.inputType || 'text';
        const hidden = this.props.hidden || false;

        if(!hidden){
            return (
                <div className="form-group">
                    <label htmlFor={propertyName}>{displayName} <span className="text-danger">*</span></label>
                    <input
                        value={propertyValue}
                        type={inputType}
                        className="form-control"
                        id={propertyName}
                        placeholder={displayName}
                        onChange={(event) => {
                            changeHandler(propertyName, event.target.value);
                        }}
                    />
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