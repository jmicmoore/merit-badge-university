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
        return (
            <div>
                <Switch>
                    <Route exact path="/login"
                           render={() => (this.props.user.isAuthenticated
                               ? ( <Redirect to="/welcome"/> )
                               : ( <Login/> )
                           )}
                    />
                    <Route exact path="/register"
                           render={() => (this.props.register.isRegistered
                                ? ( <Redirect to="/register/success"/> )
                                : ( <Register/> )
                           )}
                    />
                    <Route exact path="/register/success" component={RegisterSuccess}/>
                    <Route exact path="/register/counselor" component={RegisterCounselor}/>
                    <Route exact path="/register/venturer-instructor" component={RegisterVenturerInstructor}/>
                    <Route path="/"
                           render={() => (this.props.user.isAuthenticated
                               ? ( <MainLayout/> )
                               : ( <Redirect to="/login"/> )
                           )}
                    />
                </Switch>
            </div>
        );
    };
};

const mapStateToProps = ({user, register}) => {
    return {user, register};
};

export default withRouter(connect(mapStateToProps)(App));
