import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import TextArea from "../common/components/TextArea";
import SingleSelect from '../common/components/SingleSelect';
import SimpleList from '../common/components/SimpleList';
import {getVenturingClassNames} from '../common/redux/referenceActions';
import {updateCourse, getCourseById, resetCurrentCourse} from '../admin/adminActions';
import {validate} from '../common/util/validation';
import validationConfig from './VenturerCourseValidationConfig';
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

class EditVenturerCourse extends React.Component {

    constructor(){
        super();
        this.state = {
            venturingClass: '',
            recommendedLength: '',
            recommendedSize: '',
            notes: '',
            teachers: ['Joe Smith']
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddMe = this.handleAddMe.bind(this);
        this.handleRemoveMe = this.handleRemoveMe.bind(this);
    }

    componentDidMount() {
        if(this.props.match.params.courseId){
            getCourseById(this.props.match.params.courseId);
        }
        getVenturingClassNames();
    };

    componentWillUnmount(){
        resetCurrentCourse();
    }

    currentCourseIsChanging(nextProps){
        return nextProps.admin.currentCourse !== this.props.admin.currentCourse;
    }

    componentWillReceiveProps(nextProps){
        if(this.currentCourseIsChanging(nextProps)){
            const courseLocalCopy = Object.assign({}, nextProps.admin.currentCourse);
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

    handleChange(field, value) {
        this.setState({[field]: value});
    };

    handleSubmit(event) {
        event.preventDefault();
        const report = validate(this.state, validationConfig);
        if(report.allValid){
            const newCourse = Object.assign(
                {},
                this.state,
                    {
                        courseType : COURSE_TYPE.Venturing,
                    }
            );
            updateCourse(newCourse);
            this.setState({ displayErrors: false });
            this.props.history.push('/admin/venturer-courses'); // go back to courses screen
        } else {
            this.setState({ displayErrors: true });
        }
        this.setState({errorReport: report});
    };

    render(){

        const venturingClassChoices = this.props.reference.venturingClassNames || [];

        const classInfo = this.state;

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
                                <SingleSelect propertyName='venturingClass' propertyValue={classInfo.venturingClass} displayName='Venturing Class' options={venturingClassChoices} errors={this.state.errorReport} changeHandler={this.handleChange}/>
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
                                        <SimpleList propertyName='teachers' displayName='Venturer Instructors' dataList={classInfo.teachers}/>
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

                            <div style={{marginTop: '20px'}} className="col-sm-offset-4 col-sm-2 col-xs-12 pull-right">
                                <button type="submit" className="btn btn-success btn-lg btn-block">Save</button>
                            </div>
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

export default withRouter(connect(mapStateToProps)(EditVenturerCourse));