import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom'
import Home from './Home';
import UserProfile from './UserProfile';
import Login from './profile/Login';
import Register from './profile/Register';

class App extends React.Component {
    render(){
        return (
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/profile" component={UserProfile}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
            </div>
        );
    };
};

export default withRouter(connect()(App));
