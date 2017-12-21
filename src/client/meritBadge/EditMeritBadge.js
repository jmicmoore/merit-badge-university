import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import FontAwesome from 'react-fontawesome';
import update from 'immutability-helper';
import MainMenu from '../common/components/MainMenu';
import TextField from '../common/components/TextField';
import CheckBox from '../common/components/CheckBox';
import TextArea from "../common/components/TextArea";
import {getMeritBadgeById, updateMeritBadge} from './meritBadgeActions';
import {mbuAPI} from '../common/constants';
import {validate} from '../common/util/validation';
import validationConfig from './MeritBadgeValidationConfig';

class EditMeritBadge extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            imageFileName: '',
            eagleRequired: false,
            imageUrl: '',
            requirements: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        // getMeritBadgeById(this.props.match.params.badgeId);
    };

    componentWillReceiveProps({currentMeritBadge}){
        // const initState = {
        //     name: currentMeritBadge.name,
        //     eagleRequired: currentMeritBadge.eagleRequired,
        //     imageUrl: currentMeritBadge.imageUrl
        // };
        // this.setState(initState);
    };

    handleSubmit(event) {
        event.preventDefault();
        const report = validate(this.state, validationConfig);
        if(report.allValid){
            updateMeritBadge(this.state);
            this.setState({ displayErrors: false });
            this.props.history.push('/admin/merit-badges'); // go back to merit badges screen
        } else {
            this.setState({ displayErrors: true });
        }
        this.setState({errorReport: report});
    };


    handleChange(field, value) {
        this.setState({[field]: value});
    };

    addNewRequirement(newRequirement) {
        const newRequirements = update(this.state.requirements, {$push: [newRequirement]});
        this.setState({requirements: newRequirements});
    };

    addNewSubRequirement(reqIndex, newSub) {
        const currentRequirement = this.state.requirements[reqIndex];
        const newSubRequirements = update(currentRequirement.subRequirements, {$push: [newSub]});

        const updatedRequirement = Object.assign({}, currentRequirement, {subRequirements: newSubRequirements});
        const newRequirements = update(this.state.requirements, {[reqIndex]: {$set: updatedRequirement}});
        this.setState({requirements: newRequirements});
    };

    deleteRequirement(reqIndex) {
        const newRequirements = update(this.state.requirements, {$splice: [[reqIndex, 1]]});
        this.setState({requirements: newRequirements});
    };

    deleteSubRequirement(reqIndex, subIndex) {
        const currentRequirement = this.state.requirements[reqIndex];

        const newSubRequirements = update(currentRequirement.subRequirements, {$splice: [[subIndex, 1]]});
        const updatedRequirement = Object.assign({}, currentRequirement, {subRequirements: newSubRequirements});
        const newRequirements = update(this.state.requirements, {[reqIndex]: {$set: updatedRequirement}});
        this.setState({requirements: newRequirements});
    };

    changeRequirement(field, value, reqIndex){
        const newRequirement = Object.assign({}, this.state.requirements[reqIndex], {[field]: value});
        const newRequirements = update(this.state.requirements, {[reqIndex]: {$set: newRequirement}});
        this.setState({requirements: newRequirements});
    };

    changeSubRequirement(reqIndex, field, value, subIndex){
        const currentRequirement = this.state.requirements[reqIndex];
        const newSubRequirement = Object.assign({}, currentRequirement.subRequirements[subIndex], {[field]: value});

        const newSubRequirements = update(currentRequirement.subRequirements, {[subIndex]: {$set: newSubRequirement}});
        const updatedRequirement = Object.assign({}, currentRequirement, {subRequirements: newSubRequirements});
        const newRequirements = update(this.state.requirements, {[reqIndex]: {$set: updatedRequirement}});
        this.setState({requirements: newRequirements});
    };

    // const SubRequirement = new Schema({
    //     part: String,
    //     text: String,
    //     note: String
    // });
    renderSubRequirement(reqIndex, sub, index){
        const part = sub.part;
        const text = sub.text;
        const note = sub.note;

        return (
            <div key={`Req_${reqIndex}_Subrequirement_${index}`} className="well">
                <div className="row">
                    <div className="col-sm-2 col-xs-12">
                        <TextField propertyName='part' propertyValue={part} displayName='Part'
                                   changeHandler={(field, value) => {this.changeSubRequirement(reqIndex, field, value, index)}}/>
                    </div>
                    <div className="col-sm-9 col-xs-12">
                        <TextArea propertyName='text' propertyValue={text} displayName='Text' rows="4"
                                  changeHandler={(field, value) => {this.changeSubRequirement(reqIndex, field, value, index)}}/>
                    </div>
                    <div className="col-sm-1 col-xs-12">
                        <a href='#' onClick={() => {
                            this.deleteSubRequirement(reqIndex, index);
                        }}>
                            <FontAwesome
                                style={{paddingRight: '5px', paddingLeft: '5px', color: 'darkred'}}
                                name="trash"
                                title="Delete Sub-Requirement"
                                size="2x"/>
                        </a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-xs-12">
                        <TextArea propertyName='note' propertyValue={note} displayName='Note' rows="2"
                                  changeHandler={(field, value) => {this.changeSubRequirement(reqIndex, field, value, index)}}/>
                    </div>
                </div>
            </div>
        );
    };


    // const Requirement = new Schema({
    //     number: Number,
    //     description: String,
    //     note: String,
    //     subRequirements: [SubRequirement]
    // });
    renderRequirement(req, reqIndex) {

        const number = String(req.number);
        const description = req.description;
        const note = req.note;
        const subRequirements = req.subRequirements;

        const nextPart = 'abcdefghijklmnopqrstuvwxyz'.charAt(subRequirements.length);

        return (
            <div key={`Requirement_${reqIndex}`} className="well">
                <div className="row">
                    <div className="col-sm-2 col-xs-12">

                        <div className="row">
                            <div className="col-sm-12 col-xs-12">
                                <TextField propertyName='number' propertyValue={number} displayName='Number'
                                           changeHandler={(field, value) => {this.changeRequirement(field, value, reqIndex)}}/>
                            </div>
                            <div className="col-sm-12 col-xs-12">
                                <a className="btn btn-sm btn-success pull-right" href='#' onClick={() => {
                                    this.addNewSubRequirement(reqIndex, {
                                        part: nextPart,
                                        text: '',
                                        note: ''
                                    });
                                }}>
                                    <FontAwesome
                                        style={{paddingRight: '5px', paddingLeft: '5px'}}
                                        name="plus"
                                        title="Add Sub-requirement"
                                    />
                                    &nbsp; Add New<br/>Sub-requirement
                                </a>
                            </div>
                        </div>

                    </div>
                    <div className="col-sm-9 col-xs-12">
                        <TextArea propertyName='description' propertyValue={description} displayName='Description' rows="4"
                                  changeHandler={(field, value) => {this.changeRequirement(field, value, reqIndex)}}/>
                    </div>
                    <div className="col-sm-1 col-xs-12">
                        <a href='#' onClick={() => {
                            this.deleteRequirement(reqIndex);
                        }}>
                            <FontAwesome
                                style={{paddingRight: '5px', paddingLeft: '5px', color: 'darkred'}}
                                name="trash"
                                title="Delete Requirement"
                                size="2x"/>
                        </a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-xs-12">
                        <TextArea propertyName='note' propertyValue={note} displayName='Note' rows="2"
                                  changeHandler={(field, value) => {this.changeRequirement(field, value, reqIndex)}}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3 col-xs-12">
                        <h4>Sub-Requirements</h4>
                    </div>
                </div>
                {
                    _.map(subRequirements, (sub, subIndex) => this.renderSubRequirement(reqIndex, sub, subIndex))
                }
            </div>
        );
    }

    render() {

        const name = this.state.name;
        const imageFileName = this.state.imageFileName;
        const eagleRequired = this.state.eagleRequired;
        const imageUrl = this.state.imageUrl;

        const requirements = this.state.requirements;

        const nextNumber = requirements.length + 1;

        return (
            <div>
                <MainMenu/>
                <div className='container'>
                    <h1>Edit Merit Badge</h1>

                    <div className="col-sm-12 well">
                        <form onSubmit={this.handleSubmit} noValidate className={this.state.displayErrors ? 'displayErrors' : ''}>
                            <div className="row">
                                <div className="col-sm-5 col-xs-12">
                                    <TextField propertyName='name' propertyValue={name} displayName='Merit Badge Name' errors={this.state.errorReport} changeHandler={this.handleChange}/>
                                </div>
                                <div className="col-sm-2 col-xs-12">
                                    <CheckBox propertyName='eagleRequired' propertyValue={eagleRequired} displayName='Eagle Required' changeHandler={this.handleChange} />
                                </div>
                                <div className="col-sm-2 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputFile">File input</label>
                                        <input type="file" id="exampleInputFile"/>
                                    </div>
                                </div>
                                <div className='col-sm-3'>
                                    Image of Class
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-offset-7 col-sm-5 col-xs-12">
                                    <TextField propertyName='imageFileName' propertyValue={imageFileName} displayName='Image File Name' changeHandler={this.handleChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-2 col-xs-12">
                                    <h3>Requirements</h3>
                                </div>
                                <div className="col-sm-2 col-xs-12">
                                    <a className="btn btn-lg btn-success" href='#' onClick={() => {
                                        this.addNewRequirement({
                                            number: nextNumber,
                                            description: '',
                                            note: '',
                                            subRequirements: []
                                        });
                                    }}>
                                        <FontAwesome
                                            style={{paddingRight: '5px', paddingLeft: '5px'}}
                                            name="plus"
                                            title="Add New"
                                            />
                                        &nbsp; Add New
                                    </a>
                                </div>
                            </div>
                            {
                                _.map(requirements, (req, index) => this.renderRequirement(req, index))
                            }
                            <div className="clearfix"></div>
                            <div className="col-sm-2 col-xs-12 pull-right">
                                <button type="button" className="btn btn-success btn-lg btn-block"
                                        onClick={() => this.props.history.push('/admin/merit-badges')}>Cancel</button>
                            </div>
                            <div className="col-sm-2 col-xs-12 pull-right">
                                <button type="submit" className="btn btn-success btn-lg btn-block">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = ({meritBadge}) => {
    return meritBadge;
};

export default withRouter(connect(mapStateToProps)(EditMeritBadge));
