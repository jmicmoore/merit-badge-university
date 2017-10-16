import React from 'react';
import {Link} from 'react-router-dom'

class ScheduledCourses extends React.Component {

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
            </div>
        );
    }
};

export default ScheduledCourses;
