import React from 'react';
import PropTypes from 'prop-types';

const EMPTY_ITEM = {value: '', label: ''};

class SingleSelect extends React.Component {

    render(){
        const propertyName = this.props.propertyName;
        const propertyValue = this.props.propertyValue;
        const displayName = this.props.displayName;
        const changeHandler = this.props.changeHandler;

        const options = this.props.options.slice();
        options.unshift(EMPTY_ITEM);

        return (
            <div className="form-group">
                <label htmlFor={propertyName}>{displayName} <span className="text-danger">*</span></label>
                <select
                    value={propertyValue}
                    className="form-control form-control-lg"
                    id={propertyName}
                    onChange={(event) => {
                        changeHandler(propertyName, event.target.value);
                    }}
                >
                    {
                        options.map( item => <option key={item.value} value={item.value}>{item.label}</option>)
                    }
                </select>
            </div>
        );
    };
};

SingleSelect.propTypes = {
    propertyName: PropTypes.string.isRequired,
    propertyValue: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    changeHandler: PropTypes.func.isRequired,
    options: PropTypes.array
};

export default SingleSelect;