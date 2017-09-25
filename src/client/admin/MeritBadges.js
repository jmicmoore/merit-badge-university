import React from 'react';
import {connect} from 'react-redux';
import MainMenu from '../common/components/MainMenu';
import {getMeritBadges} from './adminActions';
import {mbuAPI} from '../common/constants';

const createMeritBadgeRow = (meritBadgeRow) => {
    return (
        <div className='row'>
            {
                meritBadgeRow.map(badge => {
                    return (
                        <div className="col-sm-3 col-xs-12">
                            {createMeritBadge(badge)}
                        </div>
                    )
                })
            }
        </div>
    );
};

const createMeritBadge = (meritBadge) => {
    return (

        <div className="panel panel-default" key={meritBadge.name}>
            <div className="panel-body">
                <div className='row'>
                    <div className='col-sm-7'>
                        <h3>{meritBadge.name}</h3>
                    </div>
                    <div className='col-sm-5'>
                        <img src={`${mbuAPI}${meritBadge.imageUrl}`} alt={meritBadge.name} width="100px" height="100px"/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-10'>
                        <h5>{meritBadge.requirements.length} Requirements</h5>
                    </div>
                    <div className='col-sm-2'>
                        <button type="button" className="btn btn-default" aria-label="Left Align">
                            <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
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

        const meritBadges = create2DArray(4, this.props.meritBadges);

        return (
            <div>
                <MainMenu/>
                <h1>Merit Badges</h1>

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

export default connect(mapStateToProps)(MeritBadges);