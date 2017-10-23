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
import {getMeritBadgeByName, updateCourse, getCourseById, resetCurrentCourse, resetCurrentMeritBadge} from './adminActions';
import {validate} from '../common/util/validation';
import validationConfig from './MeritBadgeCourseValidationConfig';
import {COURSE_TYPE} from '../common/constants';

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

const INITIAL_STATE = {
    meritBadge: '',
    recommendedLength: '',
    recommendedSize: '',
    notes: '',
    teachers: ['Joe Smith'],
    preRequisites: {}
};

class EditCourse extends React.Component {

    constructor(){
        super();
        this.state = INITIAL_STATE;
        this.handleChange = this.handleChange.bind(this);
        this.handlePreReqChange = this.handlePreReqChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddMe = this.handleAddMe.bind(this);
        this.handleRemoveMe = this.handleRemoveMe.bind(this);
        this.selectAllPrereqs = this.selectAllPrereqs.bind(this);
        this.unselectAllPrereqs = this.unselectAllPrereqs.bind(this);
    }

    componentDidMount() {
        getMeritBadgeNames();
        if(this.props.match.params.courseId){
            getCourseById(this.props.match.params.courseId);
        }
    };

    componentWillUnmount(){
        resetCurrentCourse();
        resetCurrentMeritBadge();
    }

    currentCourseIsChanging(nextProps){
        return nextProps.admin.currentCourse !== this.props.admin.currentCourse;
    }

    componentWillReceiveProps(nextProps){
        if(this.currentCourseIsChanging(nextProps)){
            const courseLocalCopy = Object.assign({}, nextProps.admin.currentCourse);
            courseLocalCopy.preRequisites = this.convertStringArrayToTrueObjectProps(courseLocalCopy.preRequisites);
            this.setState(courseLocalCopy);
        }
    };

    handleAddMe(){
        const newTeachers = this.state.teachers.slice();
        newTeachers.push("Jerry Moore");
        this.setState({teachers: newTeachers});
    }

    handleRemoveMe(){
        const index = this.state.teachers.indexOf("Jerry Moore");
        let newTeachers = this.state.teachers.slice();
        if(index !== -1){
            newTeachers.splice(index, 1);
        }
        this.setState({teachers: newTeachers})
    }

    selectAllPrereqs(){
        const requirements = (
            this.props.admin.currentMeritBadge
            && this.props.admin.currentMeritBadge.requirements) || [];

        const newPrereqs = {};
        _.each(requirements, req => {
            if(req.subRequirements.length === 0){
                newPrereqs[`item_${req.number}`] = true;
            }
            _.each(req.subRequirements, sub => {
                newPrereqs[`item_${req.number}${sub.part}`] = true;
            });
        });
        this.setState({preRequisites: newPrereqs});
    };

    unselectAllPrereqs(){
        this.setState({preRequisites: {}});
    };

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
            const prerequisiteList = this.convertTrueObjectPropsToStringArray(this.state.preRequisites);
            const newCourse = Object.assign(
                {},
                this.state,
                    {
                        courseType : COURSE_TYPE.MeritBadge,
                        eagleRequired: badge.eagleRequired,
                        preRequisites: prerequisiteList,
                        numRequirements: badge.requirements.length,
                        imageUrl: badge.imageUrl
                    }
            );
            updateCourse(newCourse);
            this.setState({ displayErrors: false });
            this.props.history.push('/admin/merit-badge-courses'); // go back to courses screen
        } else {
            this.setState({ displayErrors: true });
        }
        this.setState({errorReport: report});
    };

    showPrereqButtons(requirements) {
        if(requirements.length > 0){
            return (
                <div>
                    <div className="col-sm-1 col-xs-12">
                        <button type="button" className="btn btn-sm" onClick={this.selectAllPrereqs}>Select All</button>
                    </div>
                    <div className="col-sm-1 col-xs-12">
                        <button type="button" className="btn btn-sm" onClick={this.unselectAllPrereqs}>Unselect All</button>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    };

    // TODO: get notes working!!!
    showSubRequirement(req, sub){
        return (
            <tr key={`${req.number}${sub.part}`}>
                <td>
                    <CheckBox key={req.number + sub.part} propertyName={`item_${req.number}${sub.part}`} propertyValue={this.state.preRequisites[`item_${req.number}${sub.part}`]}
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
            ? <CheckBox key={req.number} propertyName={`item_${req.number}`} propertyValue={this.state.preRequisites[`item_${req.number}`]}
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

    showAllRequirements(requirements){

        const requirementList = [];
        _.each(requirements, req => {
            requirementList.push(this.showRequirement(req));
            requirementList.push(
                _.map(req.subRequirements, sub => { return (this.showSubRequirement(req, sub))})
            );
        });

        if(requirementList.length > 0){
            return (
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
            );
        } else {
            return null;
        }
    };

    convertTrueObjectPropsToStringArray(object){
        const trueObjectProps = [];
        _.forOwn(object, function(value, field) {
            if(value){
                trueObjectProps.push(field);
            }
        });
        return _.map(trueObjectProps, preReq => preReq.replace('item_', '')).sort();
    }

    convertStringArrayToTrueObjectProps(array){
        const itemArray = _.map(array, item => `item_${item}`);
        const trueObjectProps = {};
        itemArray.forEach( item => trueObjectProps[item] = true);
        return trueObjectProps;
    }

    render(){

        const meritBadgeChoices = this.props.reference.meritBadgeNames.map( item => {return({value: item.name, label: item.name})});

        const classInfo = this.state;

        const requirements = (
            this.props.admin.currentMeritBadge
            && this.props.admin.currentMeritBadge.requirements) || [];

        const prerequisiteList = this.convertTrueObjectPropsToStringArray(this.state.preRequisites).join(', ');

        const index = this.state.teachers.indexOf("Jerry Moore");
        let teachingAlready = false;
        if(index !== -1){
            teachingAlready = true;
        }

        return (
            <div className="container">
                <div className="row">
                    <div id="form-container-registration" className="col-sm-offset-1 col-sm-10 well">
                        <form onSubmit={this.handleSubmit} noValidate className={this.state.displayErrors ? 'displayErrors' : ''} >

                            <h2 className="text-info">Edit Course</h2>
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
                                        <SimpleList propertyName='teachers' displayName='Counselors' dataList={classInfo.teachers}/>
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

                            {
                                this.showPrereqButtons(requirements)
                            }

                            {
                                this.showAllRequirements(requirements)
                            }
                        </form>
                    </div>
                </div>
            </div>
        );
    }

};

const mapStateToProps = ({reference, admin}) => {
    return {reference, admin};
};

export default withRouter(connect(mapStateToProps)(EditCourse));