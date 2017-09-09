import React from 'react';
import {connect} from 'react-redux';
import {setField, getProfileTypes, getCouncils, getDistricts} from './registerActions';

class Register extends React.Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        getProfileTypes();
        getCouncils();
        getDistricts();
    };

    handleChange(field, value) {
        setField(field, value);
    }

    render() {
        return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <header>
                                <h1 className="text-center success">Welcome to Merit Badge University 2018</h1>
                            </header>
                            <div className="container" id="form-container-registration">
                                <div className="row">
                                    <div className="col-sm-offset-1 col-sm-10 well">
                                        <h2 className="text-info">Registration</h2>
                                        <form>
                                            <div className="col-sm-6 col-xs-12">
                                                <div className="form-group">
                                                    <label htmlFor="firstName">First Name <span className="text-danger">*</span></label>
                                                    <input
                                                        value={this.props.firstName}
                                                        type="firstNameInputRegistration"
                                                        className="form-control"
                                                        id="firstName"
                                                        placeholder="First Name"
                                                        onChange={(event) => {
                                                            this.handleChange('firstName', event.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <div className="form-group">
                                                    <label htmlFor="lastName">Last Name <span className="text-danger">*</span></label>
                                                    <input
                                                        value={this.props.lastName}
                                                        type="lastNameInputRegistration"
                                                        className="form-control"
                                                        id="lastName"
                                                        placeholder="Last Name"
                                                        onChange={(event) => {
                                                            this.handleChange('lastName', event.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="col-sm-6 col-xs-12">
                                                <div className="form-group">
                                                    <label htmlFor="email">Email address <span className="text-danger">*</span></label>
                                                    <input
                                                        value={this.props.email}
                                                        type="inputEmailRegistration"
                                                        className="form-control"
                                                        id="email"
                                                        placeholder="Email"
                                                        onChange={(event) => {
                                                            this.handleChange('email', event.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <div className="form-group">
                                                    <label htmlFor="emailConfirm">Confirm Email address <span className="text-danger">*</span></label>
                                                    <input
                                                        value={this.props.emailConfirm}
                                                        type="inputEmailRegistrationConfirmation"
                                                        className="form-control"
                                                        id="emailConfirm"
                                                        placeholder="Email"
                                                        onChange={(event) => {
                                                            this.handleChange('emailConfirm', event.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="col-sm-6 col-xs-12">
                                                <div className="form-group">
                                                    <label htmlFor="password">Password <span className="text-danger">*</span></label>
                                                    <input
                                                        value={this.props.password}
                                                        type="inputPasswordRegistration"
                                                        className="form-control"
                                                        id="password"
                                                        placeholder="Password"
                                                        onChange={(event) => {
                                                            this.handleChange('password', event.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <div className="form-group">
                                                    <label htmlFor="passwordConfirm">Confirm Password <span className="text-danger">*</span></label>
                                                    <input
                                                        value={this.props.passwordConfirm}
                                                        type="confirmInputPasswordRegistration"
                                                        className="form-control"
                                                        id="passwordConfirm"
                                                        placeholder="Confirm Password"
                                                        onChange={(event) => {
                                                            this.handleChange('passwordConfirm', event.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="col-sm-4 col-xs-12">
                                                <div className="form-group">
                                                    <label htmlFor="selectedProfileType">Who are You? <span className="text-danger">*</span></label>
                                                    <select
                                                        value={this.props.selectedProfileType}
                                                        className="form-control form-control-lg"
                                                        id="selectedProfileType"
                                                        onChange={(event) => {
                                                            this.handleChange('selectedProfileType', event.target.value);
                                                        }}
                                                    >
                                                        {
                                                            this.props.profileTypes.map( type => <option key={type.value} value={type.value}>{type.label}</option>)
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-xs-12">
                                                <div className="form-group">
                                                    <label htmlFor="selectedCouncil">What Council Are You From? <span className="text-danger">*</span></label>
                                                    <select
                                                        value={this.props.selectedCouncil}
                                                        className="form-control form-control-lg"
                                                        id="selectedCouncil"
                                                        onChange={(event) => {
                                                            this.handleChange('selectedCouncil', event.target.value);
                                                        }}
                                                    >
                                                        {
                                                            this.props.councils.map( type => <option key={type.value} value={type.value}>{type.label}</option>)
                                                        }
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="otherCouncil">Other</label>
                                                    <input
                                                        type="otherCouncil"
                                                        className="form-control"
                                                        id="otherCouncil"
                                                        placeholder="Other"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-xs-12">
                                                <div className="form-group">
                                                    <label htmlFor="selectedDistrict">What District Are You From? <span className="text-danger">*</span></label>
                                                    <select
                                                        value={this.props.selectedDistrict}
                                                        className="form-control form-control-lg"
                                                        id="selectedDistrict"
                                                        onChange={(event) => {
                                                            this.handleChange('selectedDistrict', event.target.value);
                                                        }}
                                                    >
                                                        {
                                                            this.props.districts.map( type => <option key={type.value} value={type.value}>{type.label}</option>)
                                                        }
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="otherDistrict">Other</label>
                                                    <input
                                                        type="otherDistrict"
                                                        className="form-control"
                                                        id="otherDistrict"
                                                        placeholder="Other"
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <footer>
                                2015-17 Copyright &copy; mbu.com
                            </footer>
                        </div>
                    </div>
                </div>

        );
    }
};

const mapStateToProps = ({register}) => {
    return register;
};

export default connect(mapStateToProps)(Register);
