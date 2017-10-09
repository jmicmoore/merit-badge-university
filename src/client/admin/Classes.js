import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import MeritBadgeClass from './MeritBadgeClass';
import {getMeritBadges} from './adminActions';

const createMeritBadgeRow = (meritBadgeRow) => {
    return (
        <div className='row'>
            {
                meritBadgeRow.map(badge => {
                    return (
                        <div className="col-sm-3 col-xs-12">
                            <MeritBadgeClass meritBadge={badge}/>
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

    componentDidMount() {
        getMeritBadges();
    };

    render() {

        const meritBadges = create2DArray(4, this.props.meritBadges);

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2 col-xs-12">
                        <h1>Classes</h1>
                    </div>
                    <div className="col-sm-2 col-xs-12">
                        <button id="addNewClass" type="button" className="btn btn-success btn-lg btn-block" aria-label="Left Align">
                            <Link to={`/admin/edit-class`}>
                                Add New
                            </Link>
                        </button>
                    </div>
                </div>
                {
                    meritBadges.map(meritBadgeRow => createMeritBadgeRow(meritBadgeRow))
                }
            </div>
        )
    }
};

const mapStateToProps = ({admin}) => {
    return admin;
};

export default connect(mapStateToProps)(Classes);