import React from 'react';
import {connect} from 'react-redux';
import TextField from '../common/components/TextField';
import TextArea from "../common/components/TextArea";
import SingleSelect from '../common/components/SingleSelect';
import {getMeritBadgeNames} from '../common/redux/referenceActions';
import {validate} from '../common/util/validation';
import validationConfig from './ClassValidationConfig';

class EditClass extends React.Component {

    constructor(){
        super();
        this.state = {
            meritBadge: '',
            recommendedLength: '',
            recommendedSize: '',
            notes: '',
            prerequisites: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        getMeritBadgeNames();
    };

    handleChange(field, value) {
        this.setState({[field]: value});
    };

    handleSubmit(event) {
        event.preventDefault();
        const report = validate(this.state, validationConfig);
        if(report.allValid){
            // createUserProfile(_.omit(this.state.profile, ['emailConfirm', 'passwordConfirm']));
            this.setState({ displayErrors: false });
        } else {
            this.setState({ displayErrors: true });
        }
        this.setState({errorReport: report});
    };

    render(){

        const recommendedLengthChoices = [
            {value: '1 hour', label: '1 hour'},
            {value: '2 hours', label: '2 hours'},
            {value: '3 hours', label: '3 hours'},
            {value: '4 hours', label: '4 hours'},
            {value: 'more than 4 hours', label: 'more than 4 hours'}
        ];

        const recommendedSizeChoices = [
            {value: '2-6 students', label: '2-6 students'},
            {value: '4-8 students', label: '4-8 students'},
            {value: '6-12 students', label: '6-12 students'},
            {value: '10-20 students', label: '10-20 students'},
            {value: 'more than 20 students', label: 'more than 20 students'}
        ];

        const meritBadgeChoices = this.props.meritBadgeNames.map( item => {return({value: item.name, label: item.name})});

        const classInfo = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div id="form-container-registration" className="col-sm-offset-1 col-sm-10 well">
                        <form onSubmit={this.handleSubmit} noValidate className={this.state.displayErrors ? 'displayErrors' : ''} >

                            <h2 className="text-info">Edit Class</h2>
                            <div className="col-sm-4 col-xs-12">
                                <SingleSelect propertyName='meritBadge' propertyValue={classInfo.meritBadge} displayName='Merit Badge' options={meritBadgeChoices} errors={this.state.errorReport} changeHandler={this.handleChange}/>
                            </div>
                            <div className="col-sm-4 col-xs-12">
                                <SingleSelect propertyName='recommendedLength' propertyValue={classInfo.recommendedLength} displayName='Recommended Class Length' options={recommendedLengthChoices} errors={this.state.errorReport} changeHandler={this.handleChange}/>
                            </div>
                            <div className="col-sm-4 col-xs-12">
                                <SingleSelect propertyName='recommendedSize' propertyValue={classInfo.recommendedSize} displayName='Recommended Number of Students' options={recommendedSizeChoices} errors={this.state.errorReport} changeHandler={this.handleChange}/>
                            </div>
                            <div className="clearfix"></div>
                            <div className="col-sm-12 col-xs-12">
                                <TextArea propertyName='notes' propertyValue={classInfo.notes} displayName='Notes' errors={this.state.errorReport} changeHandler={this.handleChange}/>
                            </div>
                            <div className="clearfix"></div>

                            <h2 className="text-info">Choose Pre-requisites</h2>
                            <div className="col-sm-6 col-xs-12">
                                <TextField propertyName='prerequisites' propertyValue={classInfo.prerequisites} displayName='Pre-Requisites' errors={this.state.errorReport} changeHandler={this.handleChange}/>
                            </div>
                            <div className="clearfix"></div>

                            <div className="col-sm-offset-10 col-sm-2 col-xs-12">
                                <button className="btn btn-success btn-lg btn-block">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

};

const mapStateToProps = ({reference}) => {
    return reference;
};

export default connect(mapStateToProps)(EditClass);