import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap';
import Course from './Course';
import {getCourses, deleteCourse} from './adminActions';

const createRow = (row, deleteCallback) => {
    return (
        <div className='row'>
            {
                row.map(course => {
                    return (
                        <div className="col-sm-3 col-xs-12">
                            <Course key={course.meritBadge} course={course} deleteCallback={deleteCallback}/>
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

class Courses extends React.Component {

    constructor(){
        super();
        this.state = {
            selectedCourse: null,
            showDeleteConfirm: false
        };
        this.closeDeleteConfirm = this.closeDeleteConfirm.bind(this);
        this.openDeleteConfirm = this.openDeleteConfirm.bind(this);
        this.handleDeleteCourse = this.handleDeleteCourse.bind(this);
    };

    handleDeleteCourse(){
        deleteCourse(this.state.selectedCourse._id);
        this.closeDeleteConfirm();
    };

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

        const courses = create2DArray(4, this.props.courses);

        const courseName = this.state.selectedCourse ? this.state.selectedCourse.meritBadge : '';

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2 col-xs-12">
                        <h1>Courses</h1>
                    </div>
                    <div className="col-sm-2 col-xs-12">
                        <Link to={`/admin/edit-course`}>
                            <button id="addNewCourse" type="button" className="btn btn-success btn-lg btn-block" aria-label="Left Align">
                                Add New
                            </button>
                        </Link>
                    </div>
                </div>
                {
                    courses.map(course => createRow(course, this.openDeleteConfirm))
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

export default connect(mapStateToProps)(Courses);