import React from 'react';
import {connect} from 'react-redux';
import update from 'immutability-helper';
import {getMeritBadgeNames} from '../common/redux/referenceActions';
import {getStates, getUserProfile, updateUserProfile} from './registerActions';
import TextField from '../common/components/TextField';
import SingleSelect from '../common/components/SingleSelect';
import CheckBox from '../common/components/CheckBox';
import {validate} from '../common/util/validation';
import validationConfig from './RegisterCounselorValidationConfig';
import MultiSelect from "../common/components/MultiSelect";


class RegisterCounselor extends React.Component {

    constructor() {
        super();
        this.state = {
            counselorInfo: {
                address: '',
                city: '',
                state: '',
                zip: '',
                phone: '',
                contactMethod: '',
                youthProtectionTrained: false,
                ypTrainingDate: '',
                timeAvailable: '',
                maxNumberOfClasses: '',
                meritBadges: []
            },
            errorReport: null,
            displayErrors: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        getStates();
        getMeritBadgeNames();
        getUserProfile('jmicmoore@gmail.com');
    };

    handleChange(field, value) {
        const newState = update(this.state, {counselorInfo: {[field]: {$set: value}}});
        this.setState(newState);
    };

    handleSubmit(event) {
        event.preventDefault();

        const counselorInfo = Object.assign({}, this.state.counselorInfo);
        counselorInfo.meritBadges = counselorInfo.meritBadges.map(badge => {return(badge.value)});

        const report = validate(counselorInfo, validationConfig);
        if(report.allValid){
            const newProfile = Object.assign({}, this.props.register.userProfile, counselorInfo);
            updateUserProfile(newProfile);
            this.setState({ displayErrors: false });
        } else {
            this.setState({ displayErrors: true });
        }
        this.setState({errorReport: report});
    };

    render() {
        const basicProfile = this.props.register.userProfile;

        const firstName = basicProfile ? basicProfile.firstName : '';
        const lastName = basicProfile ? basicProfile.lastName : '';
        const email = basicProfile ? basicProfile.email : '';

        const counselorInfo = this.state.counselorInfo;

        const stateChoices = this.props.register.states.map(state => {return ({value: state.abbreviation, label: state.name})});
        const contactChoices = [
            {value: 'Text', label: 'Text'},
            {value: 'Phone', label: 'Phone'},
            {value: 'Email', label: 'E-mail'}
        ];
        const availabilityChoices = [
            {value: 'MorningOnly', label: 'Morning Only'},
            {value: 'AfternoonOnly', label: 'Afternoon Only'},
            {value: 'AllDay', label: 'All Day'}
        ];
        const numClassChoices = ['1','2','3','4','5','6','7'].map( item => {return({value: item, label: item})});
        const meritBadgeChoices = this.props.reference
            ? this.props.reference.meritBadgeNames.map( item => {return({value: item.name, label: item.name})})
            : [];


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

                                            <h2 className="text-info">Merit Badge Counselor</h2>
                                            <div className="col-sm-6 col-xs-12">
                                                <TextField propertyName='firstName' disabled={true} propertyValue={firstName} displayName='First Name'/>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <TextField propertyName='lastName' disabled={true} propertyValue={lastName} displayName='Last Name'/>
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
                                                <SingleSelect propertyName='state' propertyValue={counselorInfo.state} displayName='State' options={stateChoices} errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="col-sm-3 col-xs-12">
                                                <TextField propertyName='zip' propertyValue={counselorInfo.zip} displayName='Zip Code' errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="col-sm-6 col-xs-12">
                                                <TextField propertyName='email' disabled={true} inputType='email' propertyValue={email} displayName='Email address'/>
                                            </div>
                                            <div className="col-sm-3 col-xs-12">
                                                <TextField propertyName='phone' propertyValue={counselorInfo.phone} displayName='Cell Number' placeholder='(XXX) XXX-XXXX' errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="col-sm-3 col-xs-12">
                                                <SingleSelect propertyName='contactMethod' propertyValue={counselorInfo.contactMethod} displayName='Preferred Contact Method' options={contactChoices} errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="col-sm-3 col-xs-12">
                                                <CheckBox propertyName='youthProtectionTrained' propertyValue={counselorInfo.youthProtectionTrained}
                                                          displayName='Yes!  My Youth Protection Training is up to date!'
                                                          changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="col-sm-3 col-xs-12">
                                                <TextField propertyName='ypTrainingDate' propertyValue={counselorInfo.ypTrainingDate} displayName='YPT Date' placeholder='MM/DD/YYYY' errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="clearfix"></div>

                                            <h2 className="text-info">Availability</h2>
                                            <div className="col-sm-12 col-xs-12">
                                                <MultiSelect propertyName='meritBadges' propertyValue={counselorInfo.meritBadges} displayName='I can teach these merit badges (select up to 4)' options={meritBadgeChoices} errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="col-sm-3 col-xs-12">
                                                <SingleSelect propertyName='timeAvailable' propertyValue={counselorInfo.timeAvailable} displayName='I am available' options={availabilityChoices} errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="col-sm-5 col-xs-12">
                                                <SingleSelect propertyName='maxNumberOfClasses' propertyValue={counselorInfo.maxNumberOfClasses} displayName="I'm willing to teach this many classes" options={numClassChoices} errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="clearfix"></div>

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

const mapStateToProps = ({reference, register}) => {
    return {reference, register};
};

export default connect(mapStateToProps)(RegisterCounselor);
