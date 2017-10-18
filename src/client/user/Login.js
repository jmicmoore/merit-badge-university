import React from 'react';
import {connect} from 'react-redux';
import '../styles/login.css';
import {Link} from 'react-router-dom'
import {login} from '../user/userActions';
import TextField from '../common/components/TextField';
import {validate, convertErrorToReport} from '../common/util/validation';
import loginConfig from './LoginValidationConfig';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            userId: '',
            password: '',
            errorReport: null,
            displayErrors: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let report = convertErrorToReport(nextProps.loginError, 'userId');
        this.setState({
            displayErrors: !!report,
            errorReport: report
        });
    }

    handleChange(field, value) {
        this.setState({[field]: value});
    };

    handleSubmit(event) {
        event.preventDefault();
        const user = {userId: this.state.userId, password: this.state.password};
        const report = validate(user, loginConfig);
        if(report.allValid){
            login(user);
            this.setState({ displayErrors: false });
        } else {
            this.setState({ displayErrors: true });
        }
        this.setState({errorReport: report});
    };

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
                                    <form onSubmit={this.handleSubmit} noValidate className={this.state.displayErrors ? 'displayErrors' : ''} >
                                        <div className="col-sm-12 col-xs-12">
                                            <TextField propertyName='userId' propertyValue={this.state.userId} displayName='User ID' errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="col-sm-12 col-xs-12">
                                            <TextField propertyName='password' inputType='password' propertyValue={this.state.password} displayName='Password' errors={this.state.errorReport} changeHandler={this.handleChange}/>
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

const mapStateToProps = ({user}) => {
    return user;
};

export default connect(mapStateToProps)(Login);
