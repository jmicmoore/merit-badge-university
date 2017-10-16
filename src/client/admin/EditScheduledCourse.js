import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import SingleSelect from '../common/components/SingleSelect';
import {getClassrooms, getCourses, createScheduledCourse} from './adminActions';
import {getCounselorNames} from '../common/redux/referenceActions'
import {validate} from '../common/util/validation';
import validationConfig from './ScheduledClassValidationConfig';

const periods = [
    { periodNumber: '1', time: '8 - 8:50 am' },
    { periodNumber: '2', time: '9 - 9:50 am' },
    { periodNumber: '3', time: '10 - 10:50 am' },
    { periodNumber: '4', time: '11 - 11:50 am' },
    { periodNumber: '5', time: '12:30 - 1:20 pm' },
    { periodNumber: '6', time: '1:30 - 2:20 pm' },
    { periodNumber: '7', time: '2:30 - 3:20 pm' }
];

class EditScheduledCourse extends React.Component {

    constructor(){
        super();
        this.state = {
            classroom: '',
            period: '',
            courseName: '',
            counselor: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount(){
        getClassrooms();
        getCourses();
        getCounselorNames();
    };

    lookupCourseByName(courseName){
        return _.find(this.props.admin.courses, { 'meritBadge': courseName});
    };

    handleSubmit(event) {
        event.preventDefault();
        const report = validate(this.state, validationConfig);
        if(report.allValid){
            const course = this.lookupCourseByName(this.state.courseName);
            const newScheduledCourse = Object.assign(
                {},
                this.state,
                {
                    length: course.recommendedLength,
                    maxYouth: course.recommendedSize,
                    notes: course.notes
                }
            );
            createScheduledCourse(newScheduledCourse);
            this.setState({ displayErrors: false });
            this.props.history.push('/admin/scheduled-courses'); // go back to courses screen
        } else {
            this.setState({ displayErrors: true });
        }
        this.setState({errorReport: report});
    };


    handleChange(field, value) {
        this.setState({[field]: value});
    };

    render(){

        const courseInfo = this.state;

        const classroomChoices = this.props.admin.classrooms.map( item => {
            return ({
                value: item.name,
                label: `${item.name} (capacity ${item.capacity})`
            });
        });

        const periodChoices = periods.map( item => {
            return ({
                value: item.periodNumber,
                label: `Period ${item.periodNumber} (${item.time})`
            });
        });
        const courseChoices = this.props.admin.courses.map( item => {
            return ({
                value: item.meritBadge,
                label: `${item.meritBadge} (${item.recommendedLength})`
            })
        });
        const counselorChoices = this.props.reference.counselorNames.map( item => {
            return ({
                value: `${item.firstName} ${item.lastName}`,
                label: `${item.firstName} ${item.lastName}`
            })
        });

        return (
            <div className="container">
                <div className="row">
                    <div id="form-container-registration" className="col-sm-offset-1 col-sm-10 well">
                        <form onSubmit={this.handleSubmit} noValidate className={this.state.displayErrors ? 'displayErrors' : ''} >

                            <h2 className="text-info">Edit Scheduled Course</h2>
                            <div className="col-sm-4 col-xs-12">
                                <SingleSelect propertyName='classroom' propertyValue={courseInfo.classroom} displayName='Classroom' options={classroomChoices} errors={this.state.errorReport} changeHandler={this.handleChange}/>
                            </div>
                            <div className="col-sm-4 col-xs-12">
                                <SingleSelect propertyName='period' propertyValue={courseInfo.period} displayName='Period' options={periodChoices} errors={this.state.errorReport} changeHandler={this.handleChange}/>
                            </div>
                            <div className="col-sm-4 col-xs-12">
                                <SingleSelect propertyName='courseName' propertyValue={courseInfo.courseName} displayName='Course Name' options={courseChoices} errors={this.state.errorReport} changeHandler={this.handleChange}/>
                            </div>
                            <div className="clearfix"></div>
                            <div className="col-sm-4 col-xs-12">
                                <SingleSelect propertyName='counselor' propertyValue={courseInfo.counselor} displayName='Counselor' options={counselorChoices} errors={this.state.errorReport} changeHandler={this.handleChange}/>
                            </div>
                            <div className="clearfix"></div>
                            <div className="col-sm-offset-4 col-sm-2 col-xs-12 pull-right">
                                <button type="submit" className="btn btn-success btn-lg btn-block">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = ({reference, admin}) => {
    return {reference, admin};
};

export default withRouter(connect(mapStateToProps)(EditScheduledCourse));