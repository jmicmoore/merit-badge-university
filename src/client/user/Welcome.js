import React from 'react';
import {connect} from 'react-redux';

class Welcome extends React.Component {

    render() {
        const person =  this.props.profile ? this.props.profile.firstName : 'Stranger';
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1>Hello {person}!</h1>
                    <h2>Welcome to Merit Badge University 2018!</h2>
                    <p/>
                    <p>Select from the menu above to get started.</p>
                </div>
            </div>
        );
    }
};

const mapStateToProps = ({user}) => {
    return user;
};

export default connect(mapStateToProps)(Welcome);
