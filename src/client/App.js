import React from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom'
import Home from './Home';
import UserProfile from './UserProfile';

class App extends React.Component {
    render(){
        return (
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/profile" component={UserProfile}/>
            </div>
        );
    };
};

export default connect()(App);
