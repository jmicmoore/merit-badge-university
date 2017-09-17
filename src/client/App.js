import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect, withRouter} from 'react-router-dom'
import Home from './Home';
import Login from './user/Login';
import Register from './register/Register';
import Welcome from './user/Welcome';

class App extends React.Component {
    render(){
        return (
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/register" component={Register}/>
                <Route path="/welcome" component={Welcome}/>

                <Route exact path="/login" render={() => ( this.props.isAuthenticated ? ( <Welcome/> ) : ( <Login/> ) )}/>

            </div>
        );
    };
};

const mapStateToProps = ({user}) => {
    return user;
};

export default withRouter(connect(mapStateToProps)(App));
