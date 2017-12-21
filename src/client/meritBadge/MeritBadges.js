import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import MeritBadge from './MeritBadge';
import { Modal, Button } from 'react-bootstrap';
import {getMeritBadges, deleteMeritBadge} from '../admin/adminActions';

const createRow = (row, rowIndex, deleteCallback) => {
    return (
        <div key={`row_${rowIndex}`} className='row'>
            {
                row.map(badge => {
                    return (
                        <div key={badge.name} className="col-sm-3 col-xs-12">
                            <MeritBadge meritBadge={badge} deleteCallback={deleteCallback}/>
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

class MeritBadges extends React.Component {

    constructor(){
        super();
        this.state = {
            selectedBadge: null,
            showDeleteConfirm: false,
        };
        this.closeDeleteConfirm = this.closeDeleteConfirm.bind(this);
        this.openDeleteConfirm = this.openDeleteConfirm.bind(this);
        this.handleDeleteBadge = this.handleDeleteBadge.bind(this);
    };

    handleDeleteBadge(){
        deleteMeritBadge(this.state.selectedBadge._id);
        this.closeDeleteConfirm();
    };

    closeDeleteConfirm(){
        this.setState({
            selectedBadge: null,
            showDeleteConfirm: false
        });
    };

    openDeleteConfirm(badge){
        this.setState({
            selectedBadge: badge,
            showDeleteConfirm: true
        });
    };

    componentDidMount() {
        getMeritBadges();
    };

    render() {

        const meritBadgeGrid = create2DArray(4, this.props.meritBadges);
        const meritBadgeName = this.state.selectedBadge ? this.state.selectedBadge.name : '';

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3 col-xs-12">
                        <h1>Merit Badges</h1>
                    </div>
                    <div className="col-sm-2 col-xs-12">
                        <Link to={`/admin/edit-merit-badge`}>
                            <button id="addNewMeritBadge" type="button" className="btn btn-success btn-lg btn-block" aria-label="Left Align">
                                Add New
                            </button>
                        </Link>
                    </div>
                </div>
                {
                    meritBadgeGrid.map((badgeRow, index) => createRow(badgeRow, index, this.openDeleteConfirm))
                }
                <Modal
                    show={this.state.showDeleteConfirm}
                    onHide={this.closeDeleteConfirm}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Delete Merit Badge</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete <strong>{meritBadgeName}</strong>?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleDeleteBadge}>Yes, Delete this badge</Button>
                        <Button onClick={this.closeDeleteConfirm}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
};

const mapStateToProps = ({admin}) => {
    return admin;
};

export default connect(mapStateToProps)(MeritBadges);