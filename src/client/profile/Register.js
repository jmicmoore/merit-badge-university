import React from 'react';
import {connect} from 'react-redux';
import {getProfileTypes, getCouncils, getDistricts, createProfile} from './registerActions';
import TextField from '../common/components/TextField';
import SingleSelect from '../common/components/SingleSelect';

class Register extends React.Component {

    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            emailConfirm: '',
            password: '',
            passwordConfirm: '',
            selectedProfileType: '',
            selectedCouncil: '',
            otherCouncil: '',
            selectedDistrict: '',
            otherDistrict: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearOtherCouncil = this.clearOtherCouncil.bind(this);
        this.clearOtherDistrict = this.clearOtherDistrict.bind(this);
    }

    componentDidMount() {
        getProfileTypes();
        getCouncils();
        getDistricts();
    };

    handleChange(field, value) {
        this.setState({[field]: value});
    };

    clearOtherCouncil(){
        this.setState({otherCouncil: ''});
    };

    clearOtherDistrict(){
        this.setState({otherDistrict: ''});
    };

    handleSubmit(event) {
        event.preventDefault();
        createProfile(this.state);
    };

    render() {

        const showOtherCouncil = this.state.selectedCouncil === 'Other';
        const showOtherDistrict = this.state.selectedDistrict === 'Other';

        return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <header>
                                <h1 className="text-center success">Welcome to Merit Badge University 2018</h1>
                            </header>
                            <div className="container" id="form-container-registration">
                                <div className="row">
                                    <div className="col-sm-offset-1 col-sm-10 well">
                                        <h2 className="text-info">Registration</h2>
                                        <form onSubmit={this.handleSubmit} noValidate>
                                            <div className="col-sm-6 col-xs-12">
                                                <TextField propertyName='firstName' propertyValue={this.state.firstName} displayName='First Name' changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <TextField propertyName='lastName' propertyValue={this.state.lastName} displayName='Last Name' changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="col-sm-6 col-xs-12">
                                                <TextField propertyName='email' inputType='email' propertyValue={this.state.email} displayName='Email address' changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <TextField propertyName='emailConfirm' inputType='email' propertyValue={this.state.emailConfirm} displayName='Confirm Email address' changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="col-sm-6 col-xs-12">
                                                <TextField propertyName='password' inputType='password' propertyValue={this.state.password} displayName='Password' changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <TextField propertyName='passwordConfirm' inputType='password' propertyValue={this.state.passwordConfirm} displayName='Confirm Password' changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="col-sm-4 col-xs-12">
                                                <SingleSelect propertyName='selectedProfileType' propertyValue={this.state.selectedProfileType} displayName='Who Are You?' options={this.props.profileTypes} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="col-sm-4 col-xs-12">
                                                <SingleSelect propertyName='selectedCouncil' propertyValue={this.state.selectedCouncil} displayName='What Council Are You From?' options={this.props.councils}
                                                              changeHandler={(field, value) => {
                                                                  this.handleChange(field, value);
                                                                  if(!showOtherCouncil) this.clearOtherCouncil();
                                                              }}/>
                                                <TextField propertyName='otherCouncil' propertyValue={this.state.otherCouncil} displayName='Other Council' changeHandler={this.handleChange} hidden={!showOtherCouncil}/>
                                            </div>
                                            <div className="col-sm-4 col-xs-12">
                                                <SingleSelect propertyName='selectedDistrict' propertyValue={this.state.selectedDistrict} displayName='What District Are You From?' options={this.props.districts}
                                                              changeHandler={(field, value) => {
                                                                  this.handleChange(field, value);
                                                                  if(!showOtherDistrict) this.clearOtherDistrict();
                                                              }}/>
                                                <TextField propertyName='otherDistrict' propertyValue={this.state.otherDistrict} displayName='Other District' changeHandler={this.handleChange} hidden={!showOtherDistrict}/>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="col-sm-offset-4 col-sm-4 col-xs-12">
                                                <button className="btn btn-success btn-lg btn-block"> Register </button>
                                            </div>
                                        </form>
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

const mapStateToProps = ({register}) => {
    return register;
};

export default connect(mapStateToProps)(Register);
