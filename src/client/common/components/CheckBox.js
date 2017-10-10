import React from 'react';
import PropTypes from 'prop-types';

class CheckBox extends React.Component {

    render() {
        const propertyName = this.props.propertyName;
        const hidden = this.props.hidden || false;
        const checked = !!this.props.propertyValue

        if(!hidden){
            return (
                <div className="checkbox">
                    <label>
                        <input
                            className="input-lg"
                            checked={checked}
                            type="checkbox"
                            id={propertyName}
                            onClick={(event) => {
                                this.props.changeHandler(propertyName, event.target.checked);
                            }}
                        /> <strong>{this.props.displayName}</strong>
                    </label>
                </div>
            );
        }

        return null;
    }
};

CheckBox.propTypes = {
    propertyName: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    changeHandler: PropTypes.func.isRequired,
    propertyValue: PropTypes.bool,
    hidden: PropTypes.bool,
};

export default CheckBox;
