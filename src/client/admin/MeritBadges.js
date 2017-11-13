import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import MeritBadge from './MeritBadge';
import { Modal, Button } from 'react-bootstrap';
import {getMeritBadges} from './adminActions';

const createMeritBadgeRow = (row, deleteCallback) => {
    return (
        <div className='row'>
            {
                row.map(badge => {
                    return (
                        <div className="col-sm-3 col-xs-12">
                            <MeritBadge key={badge.name} meritBadge={badge} deleteCallback={deleteCallback}/>
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

    componentDidMount() {
        getMeritBadges();
    };

    render() {

        const meritBadgeGrid = create2DArray(4, this.props.meritBadges);
        // const meritBadgeName = this.state.selectedBadge ? this.state.selectedBadge.name : '';

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

            </div>
        )
    }
};

const mapStateToProps = ({admin}) => {
    return admin;
};

export default connect(mapStateToProps)(MeritBadges);