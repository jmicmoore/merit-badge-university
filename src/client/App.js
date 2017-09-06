import React from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom'
import Home from './Home';
import UserProfile from './UserProfile';
import Login from './profile/Login';

class App extends React.Component {
    render(){
        return (
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/profile" component={UserProfile}/>
                <Route path="/login" component={Login}/>
            </div>
        );
    };
};

export default connect()(App);
