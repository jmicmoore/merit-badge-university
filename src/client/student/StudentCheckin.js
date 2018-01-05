import React from 'react';
import {connect} from 'react-redux';
import FontAwesome from 'react-fontawesome';
import ArrivingStudent from './ArrivingStudent';
import {getStudents, updateStudent} from './studentActions';
import search from '../common/util/search';

const searchKeys = [
    'firstName', 'lastName', 'profileType', 'level', 'unit', 'leaderFirstName', 'leaderLastName'
];

class Students extends React.Component {

    constructor(){
        super();
        this.state = {
            searchTarget: '',
        };
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    };

    handleSignIn(student){
        const copy = Object.assign({}, student, {signedIn: true});
        updateStudent(copy);
    };

    handleSignOut(student){
        const copy = Object.assign({}, student, {signedIn: false});
        updateStudent(copy);
    };

    componentDidMount() {
        getStudents();
    };

    renderStudent(student, index, signInCallback, signOutCallback) {
        return (
            <div key={`row_${index}`} className='row'>
                <div className="col-sm-12 col-xs-12">
                    <ArrivingStudent student={student} signInCallback={signInCallback} signOutCallback={signOutCallback}/>
                </div>
            </div>
        );
    }

    handleSearchChange(value) {
        this.setState({searchTarget: value});
    };

    render() {

        let filteredStudents = this.props.students;
        if(this.state.searchTarget.length >= 3){
            filteredStudents = search.fuzzySearch(this.props.students, searchKeys, this.state.searchTarget);
        }

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3 col-xs-12">
                        <h1>Student Checkin</h1>
                    </div>
                    <div className="col-sm-5 col-xs-12">
                        <div className="input-group add-on">
                            <input className="form-control" placeholder="Search for Students (type at least 3 characters)" name="srch-term" id="srch-term" type="text"
                                   onChange={ (event) => this.handleSearchChange(event.target.value)}/>
                            <div className="input-group-btn">
                                <button className="btn btn-default" type="button">
                                    <FontAwesome
                                        style={{ paddingRight : '5px', paddingLeft : '5px', color : 'gray' }}
                                        name="search"
                                        title="Search for Students"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    filteredStudents.map((student, index) => this.renderStudent(student, index, this.handleSignIn, this.handleSignOut))
                }
            </div>
        )
    }
};

const mapStateToProps = ({student}) => {
    return student;
};

export default connect(mapStateToProps)(Students);