import React from 'react';
import {mbuAPI} from '../common/constants';
import FontAwesome from 'react-fontawesome';

class MeritBadgeClass extends React.Component {

    constructor(){
        super();
        this.handleEditClass = this.handleEditClass.bind(this);
    }

    handleEditClass(){
        console.log("Edit clicked");
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
                            <img src={`${mbuAPI}${mbuClass.imageUrl}`} alt={mbuClass.name} width="100px" height="100px"/>
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
                        <div className='col-md-offset-7 col-sm-2'>
                            <button id="addCounselor" onClick={() => {this.handleAddCounselor(meritBadge._id)}}>
                                <FontAwesome
                                    style={{ paddingRight : '5px', paddingLeft : '5px', color : 'blue' }}
                                    name="user"
                                    title="Add Counselor"
                                    size="lg"/>
                            </button>
                        </div>
                        <div className='col-sm-2'>
                            <button id="editClass" onClick={() => {this.handleEditClass(meritBadge._id)}}>
                                <FontAwesome
                                    style={{ paddingRight : '5px', paddingLeft : '5px', color : 'blue' }}
                                    name="pencil"
                                    title="Edit Class"
                                    size="lg"/>
                            </button>
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
