import _ from 'lodash';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import {Link} from 'react-router-dom';

class Student extends React.Component {

    constructor(){
        super();
        this.handleDeleteStudent = this.handleDeleteStudent.bind(this);
    }


    handleDeleteStudent(student){
        this.props.deleteCallback(student);
    }

    render() {
        const student = this.props.student;

        let courses = 'none selected yet';
        if(this.props.student.courses.length > 0){
            courses = _.chain(this.props.student.courses).map('courseName').join(', ').value()
        }

        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className='row'>
                        <div className='col-sm-2'>
                            {student.firstName}
                        </div>
                        <div className='col-sm-2'>
                            {student.lastName}
                        </div>
                        <div className='col-sm-1'>
                            {student.profileType}
                        </div>
                        <div className='col-sm-1'>
                            {student.level}
                        </div>
                        <div className='col-sm-1'>
                            {student.unit}
                        </div>
                        <div className='col-sm-2'>
                            {`${student.leaderFirstName} ${student.leaderLastName}`}
                        </div>
                        <div className='col-sm-1'>
                            <Link to={`/students/courses/${student._id}`}>
                                <FontAwesome
                                    style={{ paddingRight : '5px', paddingLeft : '5px', color : 'darkgreen' }}
                                    name="book"
                                    title="Assign Classes"
                                    size="2x"/>
                            </Link>
                        </div>
                        <div className='col-sm-1'>
                            <Link to={`/students/register/${student._id}`}>
                                <FontAwesome
                                    style={{ paddingRight : '5px', paddingLeft : '5px', color : 'darkblue' }}
                                    name="pencil"
                                    title="Edit Student"
                                    size="2x"/>
                            </Link>
                        </div>
                        <div className='col-sm-1'>
                            <a href='#' onClick={() => {this.handleDeleteStudent(student);}}>
                                <FontAwesome
                                    style={{ paddingRight : '5px', paddingLeft : '5px', color : 'darkred' }}
                                    name="trash"
                                    title="Delete Student"
                                    size="2x"/>
                            </a>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-offset-1 col-sm-11'>{`Courses: ${courses}`}</div>
                    </div>
                </div>
            </div>
        )
    }
};

export default Student;
