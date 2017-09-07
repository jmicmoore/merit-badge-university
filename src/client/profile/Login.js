import React from 'react';
import '../styles/login.css';
import {Link} from 'react-router-dom'

class Login extends React.Component {
    render() {

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <header>
                            <h1 className="text-center success">Welcome to Merit Badge University 2018</h1>
                        </header>
                        <div className="container">
                            <div className="row" id="form-container">

                                <div className="col-sm-offset-2 col-sm-8 col-xs-12 well">
                                    <h2 className="text-primary text-center">Log In</h2>
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Email Address</label>
                                            <input type="email" className="form-control" id="registrationInputEmail" placeholder="Email"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">Password</label>
                                            <input type="password" className="form-control" id="registrationInputPassword" placeholder="Password"/>
                                        </div>
                                        <div className="col-sm-offset-4 col-sm-4 col-xs-12 text-center">
                                            <button type="submit" className="btn btn-primary btn-lg btn-block">Login</button>
                                        </div>
                                    </form>
                                    <div className="row">
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-offset-2 col-sm-8 col-xs-12 text-center h4">
                                            New to MBU? <Link to="/register">Register</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <footer>
                            2015-17 Copyright &copy; mbu.com
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
};

export default Login;