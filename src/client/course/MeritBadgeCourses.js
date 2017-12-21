import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import CheckBox from '../common/components/CheckBox';
import { Modal, Button } from 'react-bootstrap';
import MeritBadgeCourse from './MeritBadgeCourse';
import {getCourses, deleteCourse} from '../admin/adminActions';
import {COURSE_TYPE} from '../common/constants';

const createRow = (row, rowIndex, deleteCallback) => {
    return (
        <div key={`row_${rowIndex}`} className='row'>
            {
                row.map(course => {
                    return (
                        <div key={course.meritBadge} className="col-sm-3 col-xs-12">
                            <MeritBadgeCourse course={course} deleteCallback={deleteCallback}/>
                        </div>
                    )
                })
            }
        </div>
    );
};

const create2DArray = (numCols, list) => {
    const destArray = [];

    let row = 0;
    for(let sourceIndex=0; sourceIndex < list.length;){
        destArray[row] = [];
        for(let col=0; col < numCols && sourceIndex < list.length; col++){
            destArray[row][col] = list[sourceIndex++];
        }
        row++;
    }
    return destArray;
};

class MeritBadgeCourses extends React.Component {

    constructor(){
        super();
        this.state = {
            selectedCourse: null,
            showDeleteConfirm: false,
            myCoursesOnly: false
        };
        this.closeDeleteConfirm = this.closeDeleteConfirm.bind(this);
        this.openDeleteConfirm = this.openDeleteConfirm.bind(this);
        this.handleDeleteCourse = this.handleDeleteCourse.bind(this);
        this.handleMyCoursesOnlyChange = this.handleMyCoursesOnlyChange.bind(this);
    };

    handleDeleteCourse(){
        deleteCourse(this.state.selectedCourse._id);
        this.closeDeleteConfirm();
    };

    handleMyCoursesOnlyChange(){
        this.setState({myCoursesOnly: !this.state.myCoursesOnly});
    }

    closeDeleteConfirm(){
        this.setState({
            selectedCourse: null,
            showDeleteConfirm: false
        });
    };

    openDeleteConfirm(course){
        this.setState({
            selectedCourse: course,
            showDeleteConfirm: true
        });
    };

    componentDidMount() {
        getCourses();
    };

    render() {

        const meritBadgeCourses = _.filter(this.props.courses, course => course.courseType === COURSE_TYPE.MeritBadge);

        const filteredCourses = this.state.myCoursesOnly
            ? _.filter(meritBadgeCourses, (course) => course.teachers.includes('Jerry Moore'))
            : meritBadgeCourses;

        const courseGrid = create2DArray(4, filteredCourses);

        const courseName = this.state.selectedCourse ? this.state.selectedCourse.meritBadge : '';

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2 col-xs-12">
                        <h1>Courses</h1>
                    </div>
                    <div className="col-sm-2 col-xs-12">
                        <Link to={`/admin/edit-merit-badge-course`}>
                            <button id="addNewCourse" type="button" className="btn btn-success btn-lg btn-block" aria-label="Left Align">
                                Add New
                            </button>
                        </Link>
                    </div>

                    <div className="col-sm-offset-1 col-sm-2 col-xs-12">
                        <CheckBox propertyName='myCoursesOnly' propertyValue={this.state.myCoursesOnly}
                                  displayName='Show My Courses Only'
                                  changeHandler={this.handleMyCoursesOnlyChange}/>
                    </div>
                </div>
                {
                    courseGrid.map((courseRow, index) => createRow(courseRow, index, this.openDeleteConfirm))
                }

                <Modal
                    show={this.state.showDeleteConfirm}
                    onHide={this.closeDeleteConfirm}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Delete Course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete <strong>{courseName}</strong>?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleDeleteCourse}>Yes, Delete this course</Button>
                        <Button onClick={this.closeDeleteConfirm}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    };
};

const mapStateToProps = ({admin}) => {
    return admin;
};

export default connect(mapStateToProps)(MeritBadgeCourses);