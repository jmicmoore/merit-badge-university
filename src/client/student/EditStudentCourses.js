import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {Table} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import update from 'immutability-helper';
import {getStudentById, updateStudent, resetCurrentStudent, getScheduledCourses} from './studentActions';

class EditStudentCourses extends React.Component {

    constructor(){
        super();
        this.state = {
            student: null,
            myCourses: [],
            availableCourses: []
        };
        this.handleAddCourse = this.handleAddCourse.bind(this);
        this.handleRemoveCourse = this.handleRemoveCourse.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        getScheduledCourses();
        if(this.props.match.params.studentId){
            getStudentById(this.props.match.params.studentId);
        }
    };

    componentWillUnmount(){
        resetCurrentStudent();
    }

    currentStudentIsChanging(nextProps){
        return nextProps.currentStudent !== this.props.currentStudent;
    }

    componentWillReceiveProps(nextProps){
        if(this.currentStudentIsChanging(nextProps)){
            const courseArrays = _.partition(this.props.scheduledCourses, (course) => {
                return !!_.find(nextProps.currentStudent.courses, {_id: course._id});
            });
            const myCourses = courseArrays[0];
            const availableCourses = courseArrays[1];
            this.setState({
                student: nextProps.currentStudent,
                myCourses: myCourses,
                availableCourses: availableCourses
            });
        }
    };

    handleSubmit(event) {
        event.preventDefault();
        // const report = validate(this.state, validationConfig);
        const report = {allValid: true};
        if(report.allValid){
            const newStudent = Object.assign(
                {},
                this.state.student,
                {courses: this.state.myCourses}
            );
            updateStudent(newStudent);
            this.setState({ displayErrors: false });
            this.props.history.push('/students');
        } else {
            this.setState({ displayErrors: true });
        }
        this.setState({errorReport: report});
    };

    handleAddCourse(course, availableCourseIndex) {
        const myCourses = update(this.state.myCourses, {$push: [course]});
        const availableCourses = update(this.state.availableCourses, {$splice: [[availableCourseIndex, 1]]});
        this.setState({
            myCourses: myCourses,
            availableCourses: availableCourses
        });
    };

    handleRemoveCourse(course, myCourseIndex) {
        const availableCourses = update(this.state.availableCourses, {$push: [course]});
        const myCourses = update(this.state.myCourses, {$splice: [[myCourseIndex, 1]]});
        this.setState({
            myCourses: myCourses,
            availableCourses: availableCourses
        });
    };

    renderMyCourses(courses){

        if(courses.length === 0){
            return (
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className='row'>
                            <div className='col-sm-12'>
                                No courses selected
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            _.map(this.state.myCourses, (course, index) => {
                return (
                    <div key={course.courseName} className="panel panel-default">
                        <div className="panel-body">
                            <div className='row'>
                                <div className='col-sm-1'>
                                    <a href='#' onClick={() => {this.handleRemoveCourse(course, index);}}>
                                        <FontAwesome
                                            style={{ paddingRight : '5px', paddingLeft : '5px', color : 'darkred' }}
                                            name="minus-circle"
                                            title="Remove Course"
                                            size="2x"/>
                                    </a>
                                </div>
                                <div className='col-sm-2'>{course.courseName}</div>
                                <div className='col-sm-2'>{`Period ${course.period}`}</div>
                                <div className='col-sm-2'>{course.length}</div>
                                <div className='col-sm-2'>{course.classroom}</div>
                                <div className='col-sm-2'>{course.counselor}</div>
                            </div>
                        </div>
                    </div>
                )
            })
        )
    };

    renderAvailableCourse(course, index){
        return (
            <tr key={course.courseName}>

                <td>
                    <a href='#' onClick={() => {this.handleAddCourse(course, index);}}>
                        <FontAwesome
                            style={{ paddingRight : '5px', paddingLeft : '5px', color : 'darkgreen' }}
                            name="plus-circle"
                            title="Add Course"
                            size="2x"/>
                    </a>
                </td>
                <td>{course.courseName}</td>
                <td>{course.counselor}</td>
                <td>{course.period}</td>
                <td>{course.length}</td>
                <td>{course.classroom}</td>
                <td>{course.maxYouth}</td>
            </tr>
        );
    };

    render(){

        const studentName = this.props.currentStudent ? `${this.props.currentStudent.firstName} ${this.props.currentStudent.lastName}` : '';

        return (
            <div id='form-container-edit-student' className="container-fluid">
                <div className="row">
                    <div className="col-sm-6 col-xs-12">
                        <h1>Course Schedule for {studentName}</h1>
                    </div>
                </div>
                <form onSubmit={this.handleSubmit} noValidate className={this.state.displayErrors ? 'displayErrors' : ''} >
                    <div className="row">
                        <div className="col-sm-offset-4 col-sm-8 col-xs-12">
                                {
                                    this.renderMyCourses(this.state.myCourses)
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
                            <button type="submit" className="btn btn-success btn-lg btn-block">Save</button>
                        </div>
                    </div>
                </form>

                <div className="row">
                    <div className="col-sm-6 col-xs-12">
                        <h1>Available Courses</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-12 col-xs-12'>
                        <Table striped bordered condensed hover>
                            <thead>
                            <tr>
                                <th></th>
                                <th>Course Name</th>
                                <th>Course Instructor</th>
                                <th>Course Period</th>
                                <th>Course Time</th>
                                <th>Class Room Location</th>
                                <th>Max Youth</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                _.map(this.state.availableCourses, (course, index) => this.renderAvailableCourse(course, index))
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

export default connect(mapStateToProps)(EditStudentCourses);
