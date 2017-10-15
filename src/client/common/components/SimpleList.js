import React from 'react';
import PropTypes from 'prop-types';

class SimpleList extends React.Component{

    render(){

        const propertyName = this.props.propertyName;
        const dataList = this.props.dataList;

        return (
            <div className="form-group">
                <label htmlFor={propertyName}>{this.props.displayName}</label>
                <ul id={propertyName} className="list-group">
                    {
                        dataList.map( item => {return(<li key={item} className="list-group-item">{item}</li>);})
                    }
                </ul>
            </div>

        );
    }
    
};

SimpleList.propTypes = {
    propertyName: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    dataList: PropTypes.array.isRequired
};


export default SimpleList;