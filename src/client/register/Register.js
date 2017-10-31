import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import update from 'immutability-helper';
import {getProfileTypes, getCouncils, getDistricts} from './registerActions';
import {createUserProfile, resetProfileError} from '../user/userActions';
import TextField from '../common/components/TextField';
import SingleSelect from '../common/components/SingleSelect';
import {validate, convertErrorToReport} from '../common/util/validation';
import validationConfig from './RegisterValidationConfig';


class Register extends React.Component {

    constructor() {
        super();
        this.state = {
            profile: {
                firstName: '',
                lastName: '',
                userId: '',
                userIdConfirm: '',
                password: '',
                passwordConfirm: '',
                profileType: '',
                council: '',
                otherCouncil: '',
                district: '',
                otherDistrict: ''
            },
            errorReport: null,
            displayErrors: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearOtherCouncil = this.clearOtherCouncil.bind(this);
        this.clearOtherDistrict = this.clearOtherDistrict.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let report = convertErrorToReport(nextProps.user.createProfileError, 'userId');
        this.setState({
            displayErrors: !!report,
            errorReport: report
        });
    }

    componentDidMount() {
        getProfileTypes();
        getCouncils();
        getDistricts();
    };

    componentWillUnmount(){
        resetProfileError();
    }

    handleChange(field, value) {
        const newState = update(this.state, {profile: {[field]: {$set: value}}});

        this.clearOtherCouncil(newState);
        this.clearOtherDistrict(newState);

        this.setState(newState);
    };

    clearOtherCouncil(stateCopy){
        if(stateCopy.profile.council !== 'Other'){
            stateCopy.profile.otherCouncil = '';
        }
    };

    clearOtherDistrict(stateCopy){
        if(stateCopy.profile.district !== 'Other'){
            stateCopy.profile.otherDistrict = '';
        }
    };

    handleSubmit(event) {
        event.preventDefault();
        const report = validate(this.state.profile, validationConfig);
        if(report.allValid){
            const newProfile = Object.assign(
                {},
                this.state.profile,
                { basicRegistrationComplete: true }
            );
            createUserProfile(_.omit(newProfile, ['userIdConfirm', 'passwordConfirm']));
            this.setState({ displayErrors: false });
        } else {
            this.setState({ displayErrors: true });
        }
        this.setState({errorReport: report});
    };

    render() {
        const profile = this.state.profile;

        const showOtherCouncil = profile.council === 'Other';
        const showOtherDistrict = profile.district === 'Other';

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
                                        <form onSubmit={this.handleSubmit} noValidate className={this.state.displayErrors ? 'displayErrors' : ''} >
                                            <div className="col-sm-6 col-xs-12">
                                                <TextField propertyName='firstName' propertyValue={profile.firstName} displayName='First Name' errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <TextField propertyName='lastName' propertyValue={profile.lastName} displayName='Last Name' errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="col-sm-6 col-xs-12">
                                                <TextField propertyName='userId' propertyValue={profile.userId} displayName='Username' errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <TextField propertyName='userIdConfirm' propertyValue={profile.userIdConfirm} displayName='Confirm Username' errors={this.state.errorReport} changeHandler={this.handleChange}/>
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
                                                <SingleSelect propertyName='profileType' propertyValue={profile.profileType} displayName='Who Are You?' options={this.props.register.profileTypes} errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="col-sm-4 col-xs-12">
                                                <SingleSelect propertyName='council' propertyValue={profile.council} displayName='What Council Are You From?' options={this.props.register.councils} errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                                <TextField propertyName='otherCouncil' propertyValue={profile.otherCouncil} displayName='Other Council' hidden={!showOtherCouncil} errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="col-sm-4 col-xs-12">
                                                <SingleSelect propertyName='district' propertyValue={profile.district} displayName='What District Are You From?' options={this.props.register.districts} errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                                <TextField propertyName='otherDistrict' propertyValue={profile.otherDistrict} displayName='Other District' hidden={!showOtherDistrict} errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="col-sm-offset-6 col-sm-3 col-xs-12">
                                                <button type="submit" className="btn btn-success btn-lg btn-block"> Register </button>
                                            </div>
                                            <div className="col-sm-3 col-xs-12">
                                                <Link to="/login">
                                                    <button type="button" className="btn btn-lg btn-block"> Cancel </button>
                                                </Link>
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

const mapStateToProps = ({register, user}) => {
    return {register, user};
};

export default connect(mapStateToProps)(Register);
