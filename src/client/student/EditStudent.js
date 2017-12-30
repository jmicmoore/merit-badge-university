import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import TextField from '../common/components/TextField';
import SingleSelect from '../common/components/SingleSelect';
import {validate} from '../common/util/validation';
import validationConfig from './StudentValidationConfig';
import {updateStudent} from './studentActions';

const profileTypes = ['Scout', 'Venturer'];
const levels = [ 'Scout', 'Tenderfoot', 'Second Class', 'First Class', 'Star', 'Life', 'Eagle' ];

const scoutLabels = {
    level: 'Rank',
    unit: 'Troop Number',
    leaderFirstName: "Scout Master's First Name",
    leaderLastName: "Scout Master's Last Name",
    leaderEmail: "Scout Master's E-mail",
    leaderPhone: "Scout Master's Phone Number",
    leaderUnit: "Scout Master's Troop Number"
};

const venturerLabels = {
    level: 'Recognition',
    unit: 'Crew Number',
    leaderFirstName: "Crew Adviser's First Name",
    leaderLastName: "Crew Adviser's Last Name",
    leaderEmail: "Crew Adviser's E-mail",
    leaderPhone: "Crew Adviser's Phone Number",
    leaderUnit: "Crew Adviser's Crew Number"
};

class EditStudent extends React.Component {

    constructor(){
        super();
        this.state = {
            profileType: '',
            firstName: '',
            lastName: '',
            level: '',
            unit: '',
            leaderFirstName: '',
            leaderLastName: '',
            leaderEmail: '',
            leaderPhone: '',
            leaderUnit: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit(event) {
        event.preventDefault();
        const report = validate(this.state, validationConfig);
        if(report.allValid){
            const newStudent = Object.assign(
                {},
                this.state
            );
            updateStudent(newStudent);
            this.setState({ displayErrors: false });
            this.props.history.push('/students');
        } else {
            this.setState({ displayErrors: true });
        }
        this.setState({errorReport: report});
    };


    handleChange(field, value) {
        this.setState({[field]: value});
    };

    renderProfileSpecificFields(studentInfo, labels){
        if(!studentInfo.profileType){
            return (
                <div></div>
            )
        }

        const levelChoices = levels.map( item => {
            return ({
                value: item,
                label: item
            });
        });

        return (
            <div>
                <div className="clearfix"></div>
                <div className="col-sm-3 col-xs-12">
                    <SingleSelect propertyName='level' propertyValue={studentInfo.level} displayName={labels.level} options={levelChoices} errors={this.state.errorReport} changeHandler={this.handleChange}/>
                </div>
                <div className="col-sm-4 col-xs-12">
                    <TextField propertyName='unit' propertyValue={studentInfo.unit} displayName={labels.unit} errors={this.state.errorReport} changeHandler={this.handleChange}/>
                </div>
                <div className="clearfix"></div>
                <div className="col-sm-6 col-xs-12">
                    <TextField propertyName='leaderFirstName' propertyValue={studentInfo.leaderFirstName} displayName={labels.leaderFirstName} errors={this.state.errorReport} changeHandler={this.handleChange}/>
                </div>
                <div className="col-sm-6 col-xs-12">
                    <TextField propertyName='leaderLastName' propertyValue={studentInfo.leaderLastName} displayName={labels.leaderLastName} errors={this.state.errorReport} changeHandler={this.handleChange}/>
                </div>
                <div className="clearfix"></div>
                <div className="col-sm-4 col-xs-12">
                    <TextField propertyName='leaderEmail' inputType='email' propertyValue={studentInfo.leaderEmail} displayName={labels.leaderEmail} errors={this.state.errorReport} changeHandler={this.handleChange}/>
                </div>
                <div className="col-sm-4 col-xs-12">
                    <TextField propertyName='leaderPhone' propertyValue={studentInfo.leaderPhone} displayName={labels.leaderPhone} placeholder='XXX-XXX-XXXX' errors={this.state.errorReport} changeHandler={this.handleChange}/>
                </div>
                <div className="col-sm-4 col-xs-12">
                    <TextField propertyName='leaderUnit' propertyValue={studentInfo.leaderUnit} displayName={labels.leaderUnit} errors={this.state.errorReport} changeHandler={this.handleChange}/>
                </div>
            </div>
        )
    };

    render() {

        const studentInfo = this.state;

        const profileChoices = profileTypes.map( item => {
            return ({
                value: item,
                label: item
            });
        });

        const labels = studentInfo.profileType === 'Scout' ? scoutLabels : venturerLabels;

        return (
            <div className="container">
                <div className="row">
                    <div id="form-container-registration" className="col-sm-offset-1 col-sm-10 well">
                        <form onSubmit={this.handleSubmit} noValidate className={this.state.displayErrors ? 'displayErrors' : ''} >

                            <h2 className="text-info">Edit Student</h2>
                            <div className="col-sm-3 col-xs-12">
                                <SingleSelect propertyName='profileType' propertyValue={studentInfo.profileType} displayName='Student Type' options={profileChoices} errors={this.state.errorReport} changeHandler={this.handleChange}/>
                            </div>
                            <div className="clearfix"></div>
                            <div className="col-sm-6 col-xs-12">
                                <TextField propertyName='firstName' propertyValue={studentInfo.firstName} displayName='Student First Name' errors={this.state.errorReport} changeHandler={this.handleChange}/>
                            </div>
                            <div className="col-sm-6 col-xs-12">
                                <TextField propertyName='lastName' propertyValue={studentInfo.lastName} displayName='Student Last Name' errors={this.state.errorReport} changeHandler={this.handleChange}/>
                            </div>
                            {
                                this.renderProfileSpecificFields(studentInfo, labels)
                            }
                            <div className="clearfix"></div>
                            <div className="col-sm-offset-8 col-sm-2 col-xs-12">
                                <Link to="/students">
                                    <button type="button" className="btn btn-lg btn-block">Cancel</button>
                                </Link>
                            </div>

                            <div className="col-sm-2 col-xs-12">
                                <button type="submit" className="btn btn-success btn-lg btn-block">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = ({student}) => {
    return student;
};

export default connect(mapStateToProps)(EditStudent);