import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {getUserProfile} from '../user/userActions';
import {FINISH_REGISTER} from '../common/constants';

const createNextSteps = (userProfile) => {
    if(!userProfile) {
        return null;
    }
    if(userProfile.registrationComplete){
        return (
            <p>Please select from the menu above to get started.</p>
        );
    } else {
        return (
            <p>You are almost done!  Please <Link to={FINISH_REGISTER[userProfile.profileType]}>complete your registration</Link> before proceeding.</p>
        );
    }
};

class Welcome extends React.Component {

    componentDidMount() {
        getUserProfile(this.props.userId);
    };

    render() {
        const firstName =  this.props.profile ? this.props.profile.firstName : 'Stranger';

        return (
            <div className="container">
                <div className="jumbotron">
                    <h1>Hello {firstName}!</h1>
                    <h2>Welcome to Merit Badge University 2018!</h2>
                    <p/>
                    {createNextSteps(this.props.profile)}
                </div>
            </div>
        );
    }
};

const mapStateToProps = ({user}) => {
    return user;
};

export default connect(mapStateToProps)(Welcome);
