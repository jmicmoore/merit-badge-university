import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter} from 'react-router-dom'
import MainLayout from './MainLayout';
import Login from './user/Login';
import Register from './register/Register';
import RegisterCounselor from './register/RegisterCounselor';

class App extends React.Component {
    render(){
        return (
            <div>
                <Switch>
                    <Route exact path="/login" render={() => ( this.props.isAuthenticated ? ( <Welcome/> ) : ( <Login/> ) )}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/register/counselor" component={RegisterCounselor}/>
                    <Route path="/" component={MainLayout}/>
                </Switch>
            </div>
        );
    };
};

const mapStateToProps = ({user}) => {
    return user;
};

export default withRouter(connect(mapStateToProps)(App));
