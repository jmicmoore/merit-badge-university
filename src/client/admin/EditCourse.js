import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import update from 'immutability-helper';
import {Table} from 'react-bootstrap';
import TextField from '../common/components/TextField';
import TextArea from "../common/components/TextArea";
import SingleSelect from '../common/components/SingleSelect';
import CheckBox from '../common/components/CheckBox';
import SimpleList from '../common/components/SimpleList';
import {getMeritBadgeNames} from '../common/redux/referenceActions';
import {getMeritBadgeByName, addCourse} from './adminActions';
import {validate} from '../common/util/validation';
import validationConfig from './ClassValidationConfig';

class EditCourse extends React.Component {

    constructor(){
        super();
        this.state = {
            meritBadge: '',
            recommendedLength: '',
            recommendedSize: '',
            notes: '',
            counselors: ['Joe Smith'],
            preRequisites: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handlePreReqChange = this.handlePreReqChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddMe = this.handleAddMe.bind(this);
        this.handleRemoveMe = this.handleRemoveMe.bind(this);
    }

    componentDidMount() {
        getMeritBadgeNames();
    };

    handleAddMe(){
        const newCounselors = this.state.counselors.slice();
        newCounselors.push("Jerry Moore");
        this.setState({counselors: newCounselors});
    }

    handleRemoveMe(){
        const index = this.state.counselors.indexOf("Jerry Moore");
        let newCounselors = this.state.counselors.slice();
        if(index !== -1){
            newCounselors.splice(index, 1);
        }
        this.setState({counselors: newCounselors})
    }

    handlePreReqChange(field, value) {
        const newState = update(this.state, {preRequisites: {[field]: {$set: value}}});
        this.setState(newState);
    };

    handleChange(field, value) {
        this.setState({[field]: value});

        if(field === 'meritBadge' && value !== this.state.meritBadge){
            this.setState({preRequisites: {}});
            getMeritBadgeByName(value);
        }
    };

    handleSubmit(event) {
        event.preventDefault();
        const report = validate(this.state, validationConfig);
        if(report.allValid){
            const badge = this.props.admin.currentMeritBadge || {};
            const prerequisiteList = this.convertTruePropsToStringArray(this.state.preRequisites);
            const newClass = Object.assign(
                {},
                this.state,
                    {
                        eagleRequired: badge.eagleRequired,
                        preRequisites: prerequisiteList,
                        numRequirements: badge.requirements.length,
                        imageUrl: badge.imageUrl
                    }
            );
            addCourse(newClass);
            this.setState({ displayErrors: false });
            this.props.history.push('/admin/courses'); // go back to courses screen
        } else {
            this.setState({ displayErrors: true });
        }
        this.setState({errorReport: report});
    };

    // TODO: get notes working!!!
    showSubRequirement(req, sub){
        return (
            <tr key={`${req.number}${sub.part}`}>
                <td>
                    <CheckBox propertyName={`item_${req.number}${sub.part}`} propertyValue={this.state.preRequisites[`item_${req.number}${sub.part}`]}
                              displayName=''
                              changeHandler={this.handlePreReqChange}/>
                </td>
                <td style={{paddingLeft: '40px'}}>
                    {`${sub.part}.  ${sub.text}`}
                </td>
            </tr>
        );
    };

    showRequirement(req){
        const checkbox = req.subRequirements.length === 0
            ? <CheckBox propertyName={`item_${req.number}`} propertyValue={this.state.preRequisites[`item_${req.number}`]}
                        displayName=''
                        changeHandler={this.handlePreReqChange}/>
            : null;
        return (
            <tr key={req.number}>
                <td>
                    {checkbox}
                </td>
                <td>
                    {`${req.number}.  ${req.description}`}
                </td>
            </tr>
        );
    };

    convertTruePropsToStringArray(preRequisites){
        const truePreReqs = [];
        _.forOwn(preRequisites, function(checked, preReq) {
            if(checked){
                truePreReqs.push(preReq);
            }
        });
        return _.map(truePreReqs, preReq => preReq.replace('item_', ''));
    }

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

        const meritBadgeChoices = this.props.reference.meritBadgeNames.map( item => {return({value: item.name, label: item.name})});

        const classInfo = this.state;

        const requirements = (
            this.props.admin
            && this.props.admin.currentMeritBadge
            && this.props.admin.currentMeritBadge.requirements) || [];

        const requirementList = [];
        _.each(requirements, req => {
            requirementList.push(this.showRequirement(req));
            requirementList.push(
                _.map(req.subRequirements, sub => { return (this.showSubRequirement(req, sub))})
            );
        });

        const prerequisiteList = this.convertTruePropsToStringArray(this.state.preRequisites).join(', ');

        const index = this.state.counselors.indexOf("Jerry Moore");
        let teachingAlready = false;
        if(index !== -1){
            teachingAlready = true;
        }

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
                            <div className="col-sm-8 col-xs-12">
                                <TextArea propertyName='notes' propertyValue={classInfo.notes} displayName='Notes' errors={this.state.errorReport} changeHandler={this.handleChange}/>
                            </div>
                            <div className="col-sm-4 col-xs-12">
                                <div className="row">
                                    <div className="col-sm-12 col-xs-12">
                                        <SimpleList propertyName='counselors' displayName='Counselors' dataList={classInfo.counselors}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-3 col-xs-12">
                                        <button type="button" className="btn btn-sm" disabled={teachingAlready} onClick={this.handleAddMe}>Add Me</button>
                                    </div>
                                    <div className="col-sm-3 col-xs-12">
                                        <button type="button" className="btn btn-sm" onClick={this.handleRemoveMe}>Remove Me</button>
                                    </div>
                                </div>
                            </div>
                            <div className="clearfix"></div>

                            <h2 className="text-info">Choose Pre-requisites</h2>
                            <div className="col-sm-6 col-xs-12">
                                <TextField disabled={true} propertyName='prerequisiteList' propertyValue={prerequisiteList} displayName='Pre-Requisites'/>
                            </div>
                            <div className="col-sm-offset-4 col-sm-2 col-xs-12 pull-right">
                                <button type="submit" className="btn btn-success btn-lg btn-block">Save</button>
                            </div>
                            <div className="clearfix"></div>

                            <Table striped bordered condensed hover>
                                <thead>
                                <tr>
                                    <th>Pre-Requisite</th>
                                    <th>Requirement</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    requirementList
                                }
                                </tbody>
                            </Table>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

};

const mapStateToProps = ({reference, admin}) => {
    return {reference, admin};
};

export default withRouter(connect(mapStateToProps)(EditCourse));