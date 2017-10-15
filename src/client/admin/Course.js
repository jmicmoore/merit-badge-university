import React from 'react';
import {mbuAPI} from '../common/constants';
import FontAwesome from 'react-fontawesome';
import {Link} from 'react-router-dom';

class Course extends React.Component {

    constructor(){
        super();
        this.handleDeleteCourse = this.handleDeleteCourse.bind(this);
    }

    handleDeleteCourse(course){
        this.props.deleteCallback(course);
    }

    showEagle(eagleRequired){
        if(eagleRequired){
            return (<img src={`${mbuAPI}/images/EagleRequired.png`} alt='Eagle' width="30px" height="30px" />);
        } else {
            return null;
        }
    }

    render() {
        const course = this.props.course;

        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className='row'>
                        <div className='col-sm-1'>
                            {this.showEagle(course.eagleRequired)}
                        </div>
                        <div className='col-sm-6'>
                            <h4>{course.meritBadge}</h4>
                        </div>
                        <div className='col-sm-4'>
                            <img src={`${mbuAPI}${course.imageUrl}`} alt={course.meritBadge} width="100px" height="100px"/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12'>
                            {course.numRequirements} Requirements
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
                            <Link to="/admin/edit-course">
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
                            <strong>Pre-requisites:&nbsp;&nbsp;</strong>{course.preRequisites.join(', ')}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <strong>Counselors:&nbsp;&nbsp;</strong>{course.counselors.join(', ')}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Course;
