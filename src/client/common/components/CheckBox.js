import React from 'react';
import PropTypes from 'prop-types';

class CheckBox extends React.Component {

    render() {
        const propertyName = this.props.propertyName;
        const hidden = this.props.hidden || false;

        if(!hidden){
            return (
                <div className="checkbox">
                    <label>
                        <input
                            className="input-lg"
                            checked={this.props.propertyValue}
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
    propertyValue: PropTypes.bool.isRequired,
    displayName: PropTypes.string.isRequired,
    changeHandler: PropTypes.func.isRequired,
    hidden: PropTypes.bool,
};

export default CheckBox;
