import React from 'react';
import {connect} from 'react-redux';
import update from 'immutability-helper';
import {getProfileTypes, getCouncils, getDistricts, createProfile} from './registerActions';
import TextField from '../common/components/TextField';
import SingleSelect from '../common/components/SingleSelect';
import {isValid, validate} from '../common/util/validation';
import validationConfig from './RegisterValidationConfig';


class Register extends React.Component {

    constructor() {
        super();
        this.state = {
            profile: {
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
            },
            errorReport: null
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
        const newState = update(this.state, {profile: {[field]: {$set: value}}});

        this.clearOtherCouncil(newState);
        this.clearOtherDistrict(newState);

        this.setState(newState);
    };

    clearOtherCouncil(stateCopy){
        if(stateCopy.profile.selectedCouncil !== 'Other'){
            stateCopy.profile.otherCouncil = '';
        }
    };

    clearOtherDistrict(stateCopy){
        if(stateCopy.profile.selectedDistrict !== 'Other'){
            stateCopy.profile.otherDistrict = '';
        }
    };

    handleSubmit(event) {
        event.preventDefault();
        const report = validate(this.state.profile, validationConfig);
        if(report.allValid){
            createProfile(this.state.profile);
        } else {
            this.setState({errorReport: report});
        }
    };

    render() {
        const profile = this.state.profile;

        const showOtherCouncil = profile.selectedCouncil === 'Other';
        const showOtherDistrict = profile.selectedDistrict === 'Other';

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
                                                <TextField propertyName='firstName' propertyValue={profile.firstName} displayName='First Name' errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <TextField propertyName='lastName' propertyValue={profile.lastName} displayName='Last Name' errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="col-sm-6 col-xs-12">
                                                <TextField propertyName='email' inputType='email' propertyValue={profile.email} displayName='Email address' errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <TextField propertyName='emailConfirm' inputType='email' propertyValue={profile.emailConfirm} displayName='Confirm Email address' errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="col-sm-6 col-xs-12">
                                                <TextField propertyName='password' inputType='password' propertyValue={profile.password} displayName='Password' errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <TextField propertyName='passwordConfirm' inputType='password' propertyValue={profile.passwordConfirm} displayName='Confirm Password' errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="col-sm-4 col-xs-12">
                                                <SingleSelect propertyName='selectedProfileType' propertyValue={profile.selectedProfileType} displayName='Who Are You?' options={this.props.profileTypes} errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="col-sm-4 col-xs-12">
                                                <SingleSelect propertyName='selectedCouncil' propertyValue={profile.selectedCouncil} displayName='What Council Are You From?' options={this.props.councils} errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                                <TextField propertyName='otherCouncil' propertyValue={profile.otherCouncil} displayName='Other Council' changeHandler={this.handleChange} hidden={!showOtherCouncil}/>
                                            </div>
                                            <div className="col-sm-4 col-xs-12">
                                                <SingleSelect propertyName='selectedDistrict' propertyValue={profile.selectedDistrict} displayName='What District Are You From?' options={this.props.districts} errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                                <TextField propertyName='otherDistrict' propertyValue={profile.otherDistrict} displayName='Other District' changeHandler={this.handleChange} hidden={!showOtherDistrict}/>
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
