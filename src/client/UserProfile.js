import React from 'react';
import {connect} from 'react-redux';
import {setFirstName, setLastName} from './actions/userActions';

class UserProfile extends React.Component {
    handleFirstNameChange(event){
        setFirstName(event.target.value);
    };

    handleLastNameChange(event){
        setLastName(event.target.value);
    };

    render(){
        return (
            <form>
                <label>
                    First Name:
                    <input type="text" value={this.props.firstName} onChange={this.handleFirstNameChange} />
                </label>
                <label>
                    Last Name:
                    <input type="text" value={this.props.lastName} onChange={this.handleLastNameChange} />
                </label>
            </form>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        firstName: state.user.firstName,
        lastName: state.user.lastName
    };
};

export default connect(mapStateToProps)(UserProfile);
