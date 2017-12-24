import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import update from 'immutability-helper';
import {getUserProfile, updateUserProfile} from '../user/userActions';
import TextField from '../common/components/TextField';
import {validate} from '../common/util/validation';
import validationConfig from './RegisterScoutmasterValidationConfig';

class RegisterScoutMaster extends React.Component {

    constructor() {
        super();
        this.state = {
            scoutMasterInfo: {
                email: '',
                emailConfirm: '',
                phone: '',
                troop: ''
            },
            errorReport: null,
            displayErrors: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        getUserProfile(this.props.user.userId);
    };

    handleChange(field, value) {
        const newState = update(this.state, {scoutMasterInfo: {[field]: {$set: value}}});
        this.setState(newState);
    };

    handleSubmit(event) {
        event.preventDefault();

        const scoutMasterInfo = Object.assign({}, this.state.scoutMasterInfo);

        const report = validate(scoutMasterInfo, validationConfig);
        if(report.allValid){
            const newProfile = Object.assign(
                {},
                this.props.user.profile,
                scoutMasterInfo,
                { registrationComplete: true }
            );
            updateUserProfile(newProfile);
            this.setState({ displayErrors: false });
        } else {
            this.setState({ displayErrors: true });
        }
        this.setState({errorReport: report});
    };

    renderButtons(registrationComplete){
        if(registrationComplete){
            return (
                <div>
                    <div className="col-sm-offset-6 col-sm-2 col-xs-12">
                        <Link to="/welcome">
                            <button type="button" className="btn btn-lg btn-block"> Cancel </button>
                        </Link>
                    </div>

                    <div className="col-sm-4 col-xs-12">
                        <button type="submit" className="btn btn-success btn-lg btn-block">Update My Registration</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="col-sm-offset-8 col-sm-4 col-xs-12">
                    <button type="submit" className="btn btn-success btn-lg btn-block">Complete My Registration</button>
                </div>
            );
        }

    }

    render() {
        const basicProfile = this.props.user.profile;

        const firstName = basicProfile ? basicProfile.firstName : '';
        const lastName = basicProfile ? basicProfile.lastName : '';

        const scoutMasterInfo = this.state.scoutMasterInfo;

        const registrationComplete = this.props.user.profile ? this.props.user.profile.registrationComplete : false;

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
                                        <form onSubmit={this.handleSubmit} noValidate className={this.state.displayErrors ? 'displayErrors' : ''} >

                                            <h2 className="text-info">Scout Master</h2>
                                            <div className="col-sm-6 col-xs-12">
                                                <TextField propertyName='firstName' disabled={true} propertyValue={firstName} displayName='First Name'/>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <TextField propertyName='lastName' disabled={true} propertyValue={lastName} displayName='Last Name'/>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="col-sm-6 col-xs-12">
                                                <TextField propertyName='email' inputType='email' propertyValue={scoutMasterInfo.email} displayName='Email address' errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <TextField propertyName='emailConfirm' inputType='email' propertyValue={scoutMasterInfo.emailConfirm} displayName='Confirm Email address' errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="col-sm-2 col-xs-12">
                                                <TextField propertyName='phone' propertyValue={scoutMasterInfo.phone} displayName='Cell Number' placeholder='XXX-XXX-XXXX' errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="col-sm-2 col-xs-12">
                                                <TextField propertyName='troop' propertyValue={scoutMasterInfo.troop} displayName='Troop Number' errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="clearfix"></div>
                                            {
                                                this.renderButtons(registrationComplete)
                                            }
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

export default connect(mapStateToProps)(RegisterScoutMaster);
