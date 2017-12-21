import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import TextField from '../common/components/TextField';
import ErrorAlert from '../common/components/ErrorAlert';
import {Table} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import {addClassroom, getClassrooms, deleteClassroom} from './classroomActions';

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
        this.clearError = this.clearError.bind(this);
    };

    componentDidMount() {
        getClassrooms();
    };

    handleNameChange(propertyName, newName){
        this.setState({name: newName});
    };

    handleCapacityChange(propertyName, newCapacity){
        this.setState({capacity: newCapacity})
    };

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

    clearError() {
        this.setState({errorMessage: ""})
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

    handleDeleteClassroom(classroomId){
        deleteClassroom(classroomId);
    }

    classroomRow(classroom){
        return (
            <tr key={classroom.name}>
                <td>{classroom.name}</td>
                <td>{classroom.capacity}</td>
                <td>
                    <button id="deleteClassroom" onClick={() => {this.handleDeleteClassroom(classroom._id)}}>
                        <a>
                            <FontAwesome
                                style={{ paddingRight : '5px', paddingLeft : '5px', color : 'darkred' }}
                                name="trash"
                                title="Delete Classroom"
                                size="lg"/>
                            Delete
                        </a>
                    </button>
                </td>
            </tr>
        );
    };

    render() {
        return (
            <div className="container-fluid">
                <div className='row'>
                    <div className="col-sm-3 col-xs-12">
                        <h1>Classrooms</h1>
                    </div>
                    <div className="col-sm-8 col-xs-12">
                        <ErrorAlert errorMessage={this.state.errorMessage} dismissCallback={this.clearError}/>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-sm-2 col-xs-12">
                        <TextField propertyName='name' propertyValue={this.state.name} displayName='Name' changeHandler={this.handleNameChange}/>
                    </div>
                    <div className="col-sm-1 col-xs-12">
                        <TextField propertyName='capacity' propertyValue={this.state.capacity} displayName='Capacity' changeHandler={this.handleCapacityChange}/>
                    </div>
                    <div className='col-sm-1'>
                        <button className="btn btn-success" style={{marginTop: '25px'}} onClick={this.handleNewClassroom}>Add New</button>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-sm-12 col-xs-12">
                        <Table striped bordered condensed hover>
                            <thead>
                                <tr>
                                    <th>Classroom Name</th>
                                    <th>Capacity</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                _.map(this.props.classrooms, classroom => this.classroomRow(classroom))
                            }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        )
    };
};

const mapStateToProps = ({classroom}) => {
    return classroom;
};

export default connect(mapStateToProps)(Classrooms);
