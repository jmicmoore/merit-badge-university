import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import MainLayout from './MainLayout';
import Login from './user/Login';
import Register from './register/Register';
import RegisterSuccess from './register/RegisterSuccess';
import RegisterCounselor from './register/RegisterCounselor';
import RegisterVenturerInstructor from './register/RegisterVenturerInstructor';

class App extends React.Component {
    render(){
        const isAuthenticated = this.props.isAuthenticated;
        const basicRegistrationComplete = this.props.profile ? this.props.profile.basicRegistrationComplete : false;
        const registrationComplete = this.props.profile ? this.props.profile.registrationComplete : false;

        return (
            <div>
                <Switch>
                    <Route exact path="/login"
                           render={() => (isAuthenticated
                               ? ( <Redirect to="/welcome"/> )
                               : ( <Login/> )
                           )}
                    />
                    <Route exact path="/register"
                           render={() => (basicRegistrationComplete
                                ? ( <Redirect to="/register/success"/> )
                                : ( <Register/> )
                           )}
                    />
                    <Route exact path="/register/success" component={RegisterSuccess}/>

                    <Route exact path="/register/counselor"
                           render={() => (registrationComplete
                                ? ( <Redirect to="/welcome"/> )
                                : ( <RegisterCounselor/> )
                           )}
                    />
                    <Route exact path="/register/venturer-instructor"
                           render={() => (registrationComplete
                                ? ( <Redirect to="/welcome"/> )
                                : ( <RegisterVenturerInstructor/> )
                           )}
                    />
                    <Route path="/"
                           render={() => (isAuthenticated
                               ? ( <MainLayout/> )
                               : ( <Redirect to="/login"/> )
                           )}
                    />
                </Switch>
            </div>
        );
    };
};

const mapStateToProps = ({user}) => {
    return user;
};

export default withRouter(connect(mapStateToProps)(App));
