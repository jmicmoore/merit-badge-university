import React from 'react';
import {mbuAPI} from './constants';
import FontAwesome from 'react-fontawesome';
import {Link} from 'react-router-dom';

class MeritBadge extends React.Component {

    constructor() {
        super();
        this.handleDeleteMeritBadge = this.handleDeleteMeritBadge.bind(this);
    }

    handleDeleteMeritBadge(meritBadge) {
        this.props.deleteCallback(meritBadge);
    };

    showEagle(eagleRequired) {
        if (eagleRequired) {
            return (<img src={`${mbuAPI}/images/EagleRequired.png`} alt='Eagle' width="30px" height="30px"/>);
        } else {
            return null;
        }
    };

    render() {

        const meritBadge = this.props.meritBadge;

        return (
            <div className="panel panel-default" key={meritBadge.name}>
                <div className="panel-body">
                    <div className='row'>
                        <div className='col-sm-1'>
                            {this.showEagle(meritBadge.eagleRequired)}
                        </div>
                        <div className='col-sm-6'>
                            <h4>{meritBadge.name}</h4>
                        </div>
                        <div className='col-sm-4'>
                            <img src={`${mbuAPI}${meritBadge.imageUrl}`} alt={meritBadge.name} width="100px"
                                 height="100px"/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <h5>{meritBadge.requirements.length} Requirements</h5>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-offset-8 col-sm-4'>
                            <Link to={`/admin/edit-merit-badge/${meritBadge._id}`}>
                                <FontAwesome
                                    style={{paddingRight: '5px', paddingLeft: '5px', color: 'darkblue'}}
                                    name="pencil"
                                    title="Edit Merit Badge"
                                    size="2x"/>
                            </Link>
                            <a href='#' onClick={() => {
                                this.handleDeleteMeritBadge(meritBadge);
                            }}>
                                <FontAwesome
                                    style={{paddingRight: '5px', paddingLeft: '5px', color: 'darkred'}}
                                    name="trash"
                                    title="Delete Merit Badge"
                                    size="2x"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

}

export default MeritBadge;

