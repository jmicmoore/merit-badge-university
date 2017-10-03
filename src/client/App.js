import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom'
import MainLayout from './MainLayout';
import Login from './user/Login';
import Register from './register/Register';

class App extends React.Component {
    render(){
        return (
            <div>
                <Route path="/" component={MainLayout}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" render={() => ( this.props.isAuthenticated ? ( <Welcome/> ) : ( <Login/> ) )}/>
            </div>
        );
    };
};

const mapStateToProps = ({user}) => {
    return user;
};

export default withRouter(connect(mapStateToProps)(App));
