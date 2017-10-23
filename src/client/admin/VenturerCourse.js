import React from 'react';
import FontAwesome from 'react-fontawesome';
import {Link} from 'react-router-dom';

class VenturerCourse extends React.Component {

    constructor(){
        super();
        this.handleDeleteCourse = this.handleDeleteCourse.bind(this);
    }

    handleDeleteCourse(course){
        this.props.deleteCallback(course);
    }

    render() {
        const course = this.props.course;

        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className='row'>
                        <div className='col-sm-12'>
                            <h4>{course.venturingClass}</h4>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-8'>
                            {course.recommendedLength}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-8'>
                            {course.recommendedSize}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-offset-8 col-sm-4'>
                            <Link to={`/admin/edit-venturer-course/${course._id}`}>
                                <FontAwesome
                                    style={{ paddingRight : '5px', paddingLeft : '5px', color : 'darkblue' }}
                                    name="pencil"
                                    title="Edit Course"
                                    size="2x"/>
                            </Link>
                            <a href='#' onClick={() => {this.handleDeleteCourse(course);}}>
                                <FontAwesome
                                    style={{ paddingRight : '5px', paddingLeft : '5px', color : 'darkred' }}
                                    name="trash"
                                    title="Delete Course"
                                    size="2x"/>
                            </a>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <strong>Counselors:&nbsp;&nbsp;</strong>{course.teachers.join(', ')}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default VenturerCourse;
