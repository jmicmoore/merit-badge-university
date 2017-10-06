import React from 'react';
import {connect} from 'react-redux';
import update from 'immutability-helper';
import {getStates, getUserProfile, updateUserProfile} from './registerActions';
import TextField from '../common/components/TextField';
import SingleSelect from '../common/components/SingleSelect';
import CheckBox from '../common/components/CheckBox';
import {validate} from '../common/util/validation';
import validationConfig from './RegisterCounselorValidationConfig';


class RegisterCounselor extends React.Component {

    constructor() {
        super();
        this.state = {
            counselorInfo: {
                address: '',
                city: '',
                selectedState: '',
                zip: '',
                phone: '',
                youthProtectionTrained: false,
                ypTrainingDate: '',
            },
            errorReport: null,
            displayErrors: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        getStates();
        getUserProfile('jmicmoore@gmail.com');
    };

    handleChange(field, value) {
        const newState = update(this.state, {counselorInfo: {[field]: {$set: value}}});
        this.setState(newState);
    };

    handleSubmit(event) {
        event.preventDefault();
        const report = validate(this.state.counselorInfo, validationConfig);
        if(report.allValid){
            const newProfile = Object.assign({}, this.props.userProfile, this.state.counselorInfo);
            updateUserProfile(newProfile);
            this.setState({ displayErrors: false });
        } else {
            this.setState({ displayErrors: true });
        }
        this.setState({errorReport: report});
    };

    render() {
        // const basicProfile = {
        //     firstName: 'Jerry',
        //     lastName: 'Moore',
        //     email: 'jmicmoore@gmail.com'
        // };

        const basicProfile = this.props.userProfile;

        const firstName = basicProfile ? basicProfile.firstName : '';
        const lastName = basicProfile ? basicProfile.lastName : '';
        const email = basicProfile ? basicProfile.email : '';

        const counselorInfo = this.state.counselorInfo;

        const states = this.props.states.map(state => {return ({value: state.abbreviation, label: state.name})});

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
                                        <h2 className="text-info">Merit Badge Counselor</h2>
                                        <form onSubmit={this.handleSubmit} noValidate className={this.state.displayErrors ? 'displayErrors' : ''} >
                                            <div className="col-sm-6 col-xs-12">
                                                <TextField propertyName='firstName' disabled={true} propertyValue={firstName} displayName='First Name'/>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <TextField propertyName='lastName' disabled={true} propertyValue={lastName} displayName='Last Name'/>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="col-sm-6 col-xs-12">
                                                <TextField propertyName='email' disabled={true} inputType='email' propertyValue={email} displayName='Email address'/>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="col-sm-12 col-xs-12">
                                                <TextField propertyName='address' propertyValue={counselorInfo.address} displayName='Address' errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="col-sm-5 col-xs-12">
                                                <TextField propertyName='city' propertyValue={counselorInfo.city} displayName='City' errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="col-sm-4 col-xs-12">
                                                <SingleSelect propertyName='selectedState' propertyValue={counselorInfo.selectedState} displayName='State' options={states} errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="col-sm-3 col-xs-12">
                                                <TextField propertyName='zip' propertyValue={counselorInfo.zip} displayName='Zip Code' errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="col-sm-6 col-xs-12">
                                                <TextField propertyName='phone' propertyValue={counselorInfo.phone} displayName='Phone Number' placeholder='(XXX) XXX-XXXX' errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="col-sm-3 col-xs-12">
                                                <CheckBox propertyName='youthProtectionTrained' propertyValue={counselorInfo.youthProtectionTrained}
                                                          displayName='Yes!  My Youth Protection Training is up to date!'
                                                          changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="col-sm-3 col-xs-12">
                                                <TextField propertyName='ypTrainingDate' propertyValue={counselorInfo.ypTrainingDate} displayName='YPT Date' placeholder='MM/DD/YYYY' errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="col-sm-offset-10 col-sm-2 col-xs-12">
                                                <button className="btn btn-success btn-lg btn-block">Submit</button>
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

export default connect(mapStateToProps)(RegisterCounselor);
