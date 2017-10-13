import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap';
import MeritBadgeClass from './MeritBadgeClass';
import {getClasses, deleteClass} from './adminActions';

const createRow = (row, deleteCallback) => {
    return (
        <div className='row'>
            {
                row.map(mbuClass => {
                    return (
                        <div className="col-sm-3 col-xs-12">
                            <MeritBadgeClass key={mbuClass.meritBadge} mbuClass={mbuClass} deleteCallback={deleteCallback}/>
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

class Classes extends React.Component {

    constructor(){
        super();
        this.state = {
            selectedClass: null,
            showDeleteConfirm: false
        };
        this.closeDeleteConfirm = this.closeDeleteConfirm.bind(this);
        this.openDeleteConfirm = this.openDeleteConfirm.bind(this);
        this.handleDeleteClass = this.handleDeleteClass.bind(this);
    };

    handleDeleteClass(){
        deleteClass(this.state.selectedClass._id);
        this.closeDeleteConfirm();
    };

    closeDeleteConfirm(){
        this.setState({
            selectedClass: null,
            showDeleteConfirm: false
        });
    };

    openDeleteConfirm(mbuClass){
        this.setState({
            selectedClass: mbuClass,
            showDeleteConfirm: true
        });
    };

    componentDidMount() {
        getClasses();
    };

    render() {

        const classes = create2DArray(4, this.props.classes);

        const mbuClassName = this.state.selectedClass ? this.state.selectedClass.meritBadge : '';

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2 col-xs-12">
                        <h1>Classes</h1>
                    </div>
                    <div className="col-sm-2 col-xs-12">
                        <Link to={`/admin/edit-class`}>
                            <button id="addNewClass" type="button" className="btn btn-success btn-lg btn-block" aria-label="Left Align">
                                Add New
                            </button>
                        </Link>
                    </div>
                </div>
                {
                    classes.map(mbuClass => createRow(mbuClass, this.openDeleteConfirm))
                }

                <Modal
                    show={this.state.showDeleteConfirm}
                    onHide={this.closeDeleteConfirm}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Delete Class</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete <strong>{mbuClassName}</strong>?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleDeleteClass}>Yes, Delete this class</Button>
                        <Button onClick={this.closeDeleteConfirm}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    };
};

const mapStateToProps = ({admin}) => {
    return admin;
};

export default connect(mapStateToProps)(Classes);