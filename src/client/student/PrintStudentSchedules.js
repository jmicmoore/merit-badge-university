import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Table} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import update from 'immutability-helper';
import {getStudents} from './studentActions';
import pdf from '../common/util/pdf';

class PrintStudentSchedules extends React.Component {

    constructor(){
        super();
        this.state = {
            selectedStudents: []
        };
        this.handleAddStudent = this.handleAddStudent.bind(this);
        this.handleRemoveStudent = this.handleRemoveStudent.bind(this);
        this.handlePrintSchedules = this.handlePrintSchedules.bind(this);
    };

    componentDidMount() {
        getStudents();
    };

    handlePrintSchedules(event) {
        event.preventDefault();
        pdf.downloadStudentSchedules(this.state.selectedStudents, 'Student Schedules' );
        this.props.history.push('/students');
    };

    handleAddStudent(student) {
        const selectedStudents = update(this.state.selectedStudents, {$push: [student]});
        this.setState({
            selectedStudents: selectedStudents,
        });
    };

    handleRemoveStudent(student, selectedStudentIndex) {
        const selectedStudents = update(this.state.selectedStudents, {$splice: [[selectedStudentIndex, 1]]});
        this.setState({
            selectedStudents: selectedStudents,
        });
    };

    renderSelectedStudents(students){

        if(students.length === 0){
            return (
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className='row'>
                            <div className='col-sm-12'>
                                No students selected
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            _.map(students, (student, index) => {
                return (
                    <div key={`${student.firstName} ${student.lastName}`} className="panel panel-default">
                        <div className="panel-body">
                            <div className='row'>
                                <div className='col-sm-1'>
                                    <a href='#' onClick={() => {this.handleRemoveStudent(student, index);}}>
                                        <FontAwesome
                                            style={{ paddingRight : '5px', paddingLeft : '5px', color : 'darkred' }}
                                            name="minus-circle"
                                            title="Remove Student"
                                            size="2x"/>
                                    </a>
                                </div>
                                <div className='col-sm-2'>{student.firstName}</div>
                                <div className='col-sm-2'>{student.lastName}</div>
                                <div className='col-sm-2'>{student.profileType}</div>
                                <div className='col-sm-2'>{student.level}</div>
                                <div className='col-sm-1'>{student.unit}</div>
                                <div className='col-sm-2'>{`${student.leaderFirstName} ${student.leaderLastName}`}</div>
                            </div>
                        </div>
                    </div>
                )
            })
        )
    };

    renderStudent(student){
        return (
            <tr key={`${student.firstName} ${student.lastName}`}>

                <td>
                    <a href='#' onClick={() => {this.handleAddStudent(student);}}>
                        <FontAwesome
                            style={{ paddingRight : '5px', paddingLeft : '5px', color : 'darkgreen' }}
                            name="plus-circle"
                            title="Add Student"
                            size="2x"/>
                    </a>
                </td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.profileType}</td>
                <td>{student.level}</td>
                <td>{student.unit}</td>
                <td>{`${student.leaderFirstName} ${student.leaderLastName}`}</td>
            </tr>
        );
    };

    render(){

        const availableStudents = _.reject(this.props.students, (student) => {
            return !!_.find(this.state.selectedStudents, {_id: student._id});
        });

        return (
            <div id='form-container-edit-student' className="container-fluid">
                <div className="row">
                    <div className="col-sm-6 col-xs-12">
                        <h1>Print Course Schedules for</h1>
                    </div>
                </div>
                <form onSubmit={this.handlePrintSchedules} noValidate className={this.state.displayErrors ? 'displayErrors' : ''} >
                    <div className="row">
                        <div className="col-sm-offset-4 col-sm-8 col-xs-12">
                            {
                                this.renderSelectedStudents(this.state.selectedStudents)
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-offset-4 col-sm-1 col-xs-12">
                            <Link to="/students">
                                <button type="button" className="btn btn-lg btn-block">Cancel</button>
                            </Link>
                        </div>
                        <div className="col-sm-1 col-xs-12">
                            <button type="submit" className="btn btn-success btn-lg btn-block">Print</button>
                        </div>
                    </div>
                </form>

                <div className="row">
                    <div className="col-sm-6 col-xs-12">
                        <h1>Students</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-12 col-xs-12'>
                        <Table striped bordered condensed hover>
                            <thead>
                            <tr>
                                <th></th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Scout/Venturer</th>
                                <th>Rank/Recognition</th>
                                <th>Unit</th>
                                <th>Leader</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                _.map(availableStudents, student => this.renderStudent(student))
                            }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = ({student}) => {
    return student;
};

export default connect(mapStateToProps)(PrintStudentSchedules);

