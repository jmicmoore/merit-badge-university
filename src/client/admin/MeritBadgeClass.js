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
        const meritBadge = this.props.meritBadge;

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
                        <div className='col-sm-9'>
                            <h5>{meritBadge.requirements.length} Requirements</h5>
                        </div>
                        <div className='col-sm-3'>
                            <button id="editClass" onClick={() => {this.handleEditClass(meritBadge._id)}}>
                                <FontAwesome
                                    style={{ paddingRight : '5px', paddingLeft : '5px', color : 'blue' }}
                                    name="trash"
                                    title="Edit Class"
                                    size="lg"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default MeritBadgeClass;
