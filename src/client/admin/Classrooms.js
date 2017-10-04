import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import TextField from '../common/components/TextField';
import ErrorAlert from '../common/components/ErrorAlert';
import {addClassroom} from './adminActions';

class Classrooms extends React.Component {

    constructor(){
        super();
        this.state = {
            name: '',
            capacity: '',
            errorMessage: ''
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCapacityChange = this.handleCapacityChange.bind(this);
        this.handleNewClassroom = this.handleNewClassroom.bind(this);
    };

    handleNameChange(propertyName, newName){
        this.setState({name: newName});
    };

    handleCapacityChange(propertyName, newCapacity){
        this.setState({capacity: newCapacity})
    };

    is

    validate(name, capacity){
        if(!name){
            return "Name is required";
        } else if(!capacity){
            return "Capacity is required"
        } else if(isNaN(parseInt(capacity))){
            return "Capacity must be a number";
        } else {
            return "";
        }
    };

    handleNewClassroom(){
        const validationMsg = this.validate(this.state.name, this.state.capacity);
        this.setState({errorMessage: validationMsg});
        if(!validationMsg){
            const classroom = {
                name: this.state.name,
                capacity: parseInt(this.state.capacity)
            };
            addClassroom(classroom);
        }
    };

    render() {
        return (
            <div>
                <h1>Classrooms</h1>
                <div className='row'>
                    <div className="col-sm-offset-1 col-sm-10 col-xs-12">
                        <ErrorAlert errorMessage={this.state.errorMessage}/>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-sm-offset-1 col-sm-2 col-xs-12">
                        <TextField propertyName='name' propertyValue={this.state.name} displayName='Name' changeHandler={this.handleNameChange}/>
                    </div>
                    <div className="col-sm-1 col-xs-12">
                        <TextField propertyName='capacity' propertyValue={this.state.capacity} displayName='Capacity' changeHandler={this.handleCapacityChange}/>
                    </div>
                    <div className='col-sm-1'>
                        <button className="btn btn-success" style={{marginTop: '25px'}} onClick={this.handleNewClassroom}>Add New</button>
                    </div>
                </div>
            </div>
        )
    };
};

const mapStateToProps = ({admin}) => {
    return admin;
};

export default connect(mapStateToProps)(Classrooms);
