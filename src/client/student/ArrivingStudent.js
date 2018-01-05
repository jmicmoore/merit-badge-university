import React from 'react';
import FontAwesome from 'react-fontawesome';

class Student extends React.Component {

    constructor(){
        super();
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    handleSignIn(student){
        this.props.signInCallback(student);
    }

    handleSignOut(student){
        this.props.signOutCallback(student);
    }

    renderCheckinStatus(student){
        if(!student.signedIn){
            return null;
        }
        return (
            <div>
                <FontAwesome
                    style={{ paddingRight : '5px', paddingLeft : '5px', color : 'darkgreen' }}
                    name="check-circle"
                    title="Signed In!"
                    size="2x"/>
                <span style={{color: 'darkgreen'}}>Signed In!</span>
            </div>
        );
    }

    renderSignButton(student) {
        if(student.signedIn){
            return (
                <a href='#' onClick={() => {this.handleSignOut(student);}}>
                    <FontAwesome
                        style={{ paddingRight : '5px', paddingLeft : '5px', color : 'darkred' }}
                        name="sign-out"
                        title="Sign Out"
                        size="2x"/>
                </a>
            );
        } else {
            return (
                <a href='#' onClick={() => {this.handleSignIn(student);}}>
                    <FontAwesome
                        style={{ paddingRight : '5px', paddingLeft : '5px', color : 'darkgreen' }}
                        name="sign-in"
                        title="Sign In"
                        size="2x"/>
                </a>
            );
        }
    }

    render() {
        const student = this.props.student;

        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className='row'>
                        <div className='col-sm-2'>
                            {
                                this.renderCheckinStatus(student)
                            }
                        </div>
                        <div className='col-sm-2'>
                            {student.firstName}
                        </div>
                        <div className='col-sm-2'>
                            {student.lastName}
                        </div>
                        <div className='col-sm-1'>
                            {student.profileType}
                        </div>
                        <div className='col-sm-1'>
                            {student.level}
                        </div>
                        <div className='col-sm-1'>
                            {student.unit}
                        </div>
                        <div className='col-sm-2'>
                            {`${student.leaderFirstName} ${student.leaderLastName}`}
                        </div>
                        <div className='col-sm-1'>
                            {
                                this.renderSignButton(student)
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default Student;
