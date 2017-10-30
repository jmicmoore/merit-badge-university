import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

class RegisterSuccess extends React.Component {

    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1>You are successfully registered!</h1>
                    <p/>
                    <h2>Please <Link to="/login">Login</Link> to complete your registration.</h2>
                </div>
            </div>
        );
    }
};

const mapStateToProps = ({user}) => {
    return user;
};

export default connect(mapStateToProps)(RegisterSuccess);
