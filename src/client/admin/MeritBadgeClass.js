import React from 'react';
import {mbuAPI} from '../common/constants';
import FontAwesome from 'react-fontawesome';
import {Link} from 'react-router-dom';

class MeritBadgeClass extends React.Component {

    constructor(){
        super();
        this.handleDeleteClass = this.handleDeleteClass.bind(this);
    }

    handleDeleteClass(mbuClass){
        this.props.deleteCallback(mbuClass);
    }

    render() {
        const mbuClass = this.props.mbuClass;

        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className='row'>
                        <div className='col-sm-7'>
                            <h3>{mbuClass.meritBadge}</h3>
                        </div>
                        <div className='col-sm-5'>
                            <img src={`${mbuAPI}${mbuClass.imageUrl}`} alt={mbuClass.meritBadge} width="100px" height="100px"/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12'>
                            {mbuClass.numRequirements} Requirements
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-8'>
                            {mbuClass.recommendedLength}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-8'>
                            {mbuClass.recommendedSize}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-offset-8 col-sm-4'>
                            <Link to="/admin/edit-class">
                                <FontAwesome
                                    style={{ paddingRight : '5px', paddingLeft : '5px', color : 'darkblue' }}
                                    name="pencil"
                                    title="Edit Class"
                                    size="2x"/>
                            </Link>
                            <a href='#' onClick={() => {this.handleDeleteClass(mbuClass);}}>
                                <FontAwesome
                                    style={{ paddingRight : '5px', paddingLeft : '5px', color : 'darkred' }}
                                    name="trash"
                                    title="Delete Class"
                                    size="2x"/>
                            </a>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <strong>Pre-requisites:&nbsp;&nbsp;</strong>{mbuClass.preRequisites.join(', ')}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <strong>Counselors:&nbsp;&nbsp;</strong>{mbuClass.counselors.join(', ')}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default MeritBadgeClass;
