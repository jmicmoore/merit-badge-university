import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom'
import Home from './Home';
import Login from './user/Login';
import Register from './register/Register';
import Welcome from './user/Welcome';

class App extends React.Component {
    render(){
        return (
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/welcome" component={Welcome}/>
            </div>
        );
    };
};

export default withRouter(connect()(App));
