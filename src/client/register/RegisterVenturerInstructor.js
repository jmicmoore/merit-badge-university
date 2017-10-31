import React from 'react';
import {connect} from 'react-redux';
import update from 'immutability-helper';
import {getVenturingClassNames} from '../common/redux/referenceActions';
import {getUserProfile, updateUserProfile} from '../user/userActions';
import TextField from '../common/components/TextField';
import SingleSelect from '../common/components/SingleSelect';
import MultiSelect from "../common/components/MultiSelect";
import {validate} from '../common/util/validation';
import validationConfig from './RegisterVenturerInstructorValidationConfig';

const availabilityChoices = [
    {value: 'MorningOnly', label: 'Morning Only'},
    {value: 'AfternoonOnly', label: 'Afternoon Only'},
    {value: 'AllDay', label: 'All Day'}
];
const courseNumberChoices = ['1','2','3','4','5','6','7'].map( item => {return({value: item, label: item})});


class RegisterVenturerInstructor extends React.Component {

    constructor() {
        super();
        this.state = {
            counselorInfo: {
                timeAvailable: '',
                maxNumberOfCourses: '',
                venturingClasses: []
            },
            errorReport: null,
            displayErrors: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        getVenturingClassNames();
        getUserProfile(this.props.user.userId);
    };

    handleChange(field, value) {
        const newState = update(this.state, {counselorInfo: {[field]: {$set: value}}});
        this.setState(newState);
    };

    handleSubmit(event) {
        event.preventDefault();

        const counselorInfo = Object.assign({}, this.state.counselorInfo);
        counselorInfo.venturingClasses = counselorInfo.venturingClasses.map(vClass => {return(vClass.value)});

        const report = validate(counselorInfo, validationConfig);
        if(report.allValid){
            const newProfile = Object.assign(
                {},
                this.props.user.profile,
                counselorInfo,
                { registrationComplete: true }
            );
            updateUserProfile(newProfile);
            this.setState({ displayErrors: false });
        } else {
            this.setState({ displayErrors: true });
        }
        this.setState({errorReport: report});
    };

    render() {
        const basicProfile = this.props.user.profile;

        const firstName = basicProfile ? basicProfile.firstName : '';
        const lastName = basicProfile ? basicProfile.lastName : '';

        const counselorInfo = this.state.counselorInfo;

        const venturerClassChoices = this.props.reference ? this.props.reference.venturingClassNames : [];

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

                                            <h2 className="text-info">Venturer Instructor</h2>
                                            <div className="col-sm-6 col-xs-12">
                                                <TextField propertyName='firstName' disabled={true} propertyValue={firstName} displayName='First Name'/>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <TextField propertyName='lastName' disabled={true} propertyValue={lastName} displayName='Last Name'/>
                                            </div>
                                            <div className="clearfix"></div>

                                            <h2 className="text-info">Availability</h2>
                                            <div className="col-sm-12 col-xs-12">
                                                <MultiSelect propertyName='venturingClasses' propertyValue={counselorInfo.venturingClasses} displayName='I can teach these Venturer Classes (select up to 4)' options={venturerClassChoices} errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="col-sm-3 col-xs-12">
                                                <SingleSelect propertyName='timeAvailable' propertyValue={counselorInfo.timeAvailable} displayName='I am available' options={availabilityChoices} errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="col-sm-5 col-xs-12">
                                                <SingleSelect propertyName='maxNumberOfCourses' propertyValue={counselorInfo.maxNumberOfCourses} displayName="I'm willing to teach this many courses" options={courseNumberChoices} errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                            </div>
                                            <div className="clearfix"></div>

                                            <div className="col-sm-offset-10 col-sm-2 col-xs-12">
                                                <button type="submit" className="btn btn-success btn-lg btn-block">Submit</button>
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

const mapStateToProps = ({reference, register, user}) => {
    return {reference, register, user};
};

export default connect(mapStateToProps)(RegisterVenturerInstructor);
