import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Table} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import {getScheduledCourses, deleteScheduledCourse} from './adminActions';

class ScheduledCourses extends React.Component {

    componentDidMount(){
        getScheduledCourses();
    };

    handleDeleteScheduledCourse(scheduledCourseId){
        deleteScheduledCourse(scheduledCourseId);
    }

    courseRow(scheduledCourse){
        return (
            <tr key={scheduledCourse.courseName}>

                <td>{scheduledCourse.courseName}</td>
                <td>{scheduledCourse.counselor}</td>
                <td>{scheduledCourse.period}</td>
                <td>{scheduledCourse.length}</td>
                <td>{scheduledCourse.classroom}</td>
                <td>{scheduledCourse.maxYouth}</td>
                <td>{scheduledCourse.notes}</td>

                <td>
                    <Link to={`/admin/edit-scheduled-course/${scheduledCourse._id}`}>
                        <FontAwesome
                            style={{ paddingRight : '5px', paddingLeft : '5px', color : 'darkblue' }}
                            name="pencil"
                            title="Edit Scheduled Course"
                            size="2x"/>
                    </Link>
                </td>
                <td>
                    <a href='#' onClick={() => {this.handleDeleteScheduledCourse(scheduledCourse._id);}}>
                        <FontAwesome
                            style={{ paddingRight : '5px', paddingLeft : '5px', color : 'darkred' }}
                            name="trash"
                            title="Delete Scheduled Course"
                            size="2x"/>
                    </a>
                </td>
            </tr>
        );
    };

    render(){

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3 col-xs-12">
                        <h1>Course Schedule</h1>
                    </div>
                    <div className="col-sm-2 col-xs-12">
                        <Link to={`/admin/edit-scheduled-course`}>
                            <button id="addNewCourse" type="button" className="btn btn-success btn-lg btn-block" aria-label="Left Align">
                                Add New
                            </button>
                        </Link>
                    </div>
                </div>

                <div className='row'>
                    <div className="col-sm-12 col-xs-12">
                        <Table striped bordered condensed hover>
                            <thead>
                            <tr>
                                <th>Course Name</th>
                                <th>Course Instructor</th>
                                <th>Course Period</th>
                                <th>Course Time</th>
                                <th>Class Room Location</th>
                                <th>Max Youth</th>
                                <th>Special Needs</th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                _.map(this.props.scheduledCourses, course => this.courseRow(course))
                            }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = ({admin}) => {
    return admin;
};

export default connect(mapStateToProps)(ScheduledCourses);
