import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import Student from './Student';
import { Modal, Button } from 'react-bootstrap';
import {getStudents, deleteStudent} from './studentActions';

class Students extends React.Component {

    constructor(){
        super();
        this.state = {
            selectedStudent: null,
            showDeleteConfirm: false
        };
        this.closeDeleteConfirm = this.closeDeleteConfirm.bind(this);
        this.openDeleteConfirm = this.openDeleteConfirm.bind(this);
        this.handleDeleteStudent = this.handleDeleteStudent.bind(this);
    };

    handleDeleteStudent(){
        deleteStudent(this.state.selectedStudent._id);
        this.closeDeleteConfirm();
    };

    closeDeleteConfirm(){
        this.setState({
            selectedStudent: null,
            showDeleteConfirm: false
        });
    };

    openDeleteConfirm(student){
        this.setState({
            selectedStudent: student,
            showDeleteConfirm: true
        });
    };

    componentDidMount() {
        getStudents();
    };

    renderStudent(student, index, deleteCallback) {
        return (
            <div key={`row_${index}`} className='row'>
                <div className="col-sm-12 col-xs-12">
                    <Student student={student} deleteCallback={deleteCallback}/>
                </div>
            </div>
        );
    }

    render() {

        const studentName = this.state.selectedStudent ? `${this.state.selectedStudent.firstName} ${this.state.selectedStudent.lastName}` : '';

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2 col-xs-12">
                        <h1>Students</h1>
                    </div>
                    <div className="col-sm-2 col-xs-12">
                        <Link to={`/students/register`}>
                            <button id="addStudent" type="button" className="btn btn-success btn-lg btn-block" aria-label="Left Align">
                                Register New Student
                            </button>
                        </Link>
                    </div>
                </div>
                {
                    this.props.students.map((student, index) => this.renderStudent(student, index, this.openDeleteConfirm))
                }

                <Modal
                    show={this.state.showDeleteConfirm}
                    onHide={this.closeDeleteConfirm}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Delete Student</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete <strong>{studentName}</strong>?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleDeleteStudent}>Yes, Delete this student</Button>
                        <Button onClick={this.closeDeleteConfirm}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
};

const mapStateToProps = ({student}) => {
    return student;
};

export default connect(mapStateToProps)(Students);