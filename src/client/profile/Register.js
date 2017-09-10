import React from 'react';
import {connect} from 'react-redux';
import {getProfileTypes, getCouncils, getDistricts} from './registerActions';

const otherDistrict = (value, handleChange, visible) => {
    if(visible){
        return (
            <div className="form-group">
                <label htmlFor="otherDistrict">Other District</label>
                <input
                    value={value}
                    type="text"
                    className="form-control"
                    id="otherDistrict"
                    placeholder="Other District"
                    onChange={(event) => {
                        handleChange('otherDistrict', event.target.value);
                    }}
                />
            </div>
        );
    }

    return null;
};

const otherCouncil = (value, handleChange, visible) => {
    if(visible){
        return (
            <div className="form-group">
                <label htmlFor="otherCouncil">Other Council</label>
                <input
                    value={value}
                    type="text"
                    className="form-control"
                    id="otherCouncil"
                    placeholder="Other Council"
                    onChange={(event) => {
                        handleChange('otherCouncil', event.target.value);
                    }}
                />
            </div>
        );
    }

    return null;
};

class Register extends React.Component {

    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            emailConfirm: '',
            password: '',
            passwordConfirm: '',
            selectedProfileType: '',
            selectedCouncil: '',
            otherCouncil: '',
            selectedDistrict: '',
            otherDistrict: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        getProfileTypes();
        getCouncils();
        getDistricts();
    };

    handleChange(field, value) {
        this.setState({[field]: value});
    }

    render() {

        const EMPTY_ITEM = {value: '', label: ''};

        const profileTypes = this.props.profileTypes.slice();
        profileTypes.unshift(EMPTY_ITEM);

        const councils = this.props.councils.slice();
        councils.unshift(EMPTY_ITEM);

        const districts = this.props.districts.slice();
        districts.unshift(EMPTY_ITEM);

        const showOtherCouncil = this.state.selectedCouncil === 'Other';
        const showOtherDistrict = this.state.selectedDistrict === 'Other';

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
                                                        value={this.state.firstName}
                                                        type="text"
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
                                                        value={this.state.lastName}
                                                        type="text"
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
                                                        value={this.state.email}
                                                        type="text"
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
                                                        value={this.state.emailConfirm}
                                                        type="text"
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
                                                        value={this.state.password}
                                                        type="password"
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
                                                        value={this.state.passwordConfirm}
                                                        type="password"
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
                                                        value={this.state.selectedProfileType}
                                                        className="form-control form-control-lg"
                                                        id="selectedProfileType"
                                                        onChange={(event) => {
                                                            this.handleChange('selectedProfileType', event.target.value);
                                                        }}
                                                    >
                                                        {
                                                            profileTypes.map( item => <option key={item.value} value={item.value}>{item.label}</option>)
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-xs-12">
                                                <div className="form-group">
                                                    <label htmlFor="selectedCouncil">What Council Are You From? <span className="text-danger">*</span></label>
                                                    <select
                                                        value={this.state.selectedCouncil}
                                                        className="form-control form-control-lg"
                                                        id="selectedCouncil"
                                                        onChange={(event) => {
                                                            this.handleChange('selectedCouncil', event.target.value);
                                                        }}
                                                    >
                                                        {
                                                            councils.map( item => <option key={item.value} value={item.value}>{item.label}</option>)
                                                        }
                                                    </select>
                                                </div>
                                                {
                                                    otherCouncil(this.state.otherCouncil, this.handleChange, showOtherCouncil)
                                                }
                                            </div>
                                            <div className="col-sm-4 col-xs-12">
                                                <div className="form-group">
                                                    <label htmlFor="selectedDistrict">What District Are You From? <span className="text-danger">*</span></label>
                                                    <select
                                                        value={this.state.selectedDistrict}
                                                        className="form-control form-control-lg"
                                                        id="selectedDistrict"
                                                        onChange={(event) => {
                                                            this.handleChange('selectedDistrict', event.target.value);
                                                        }}
                                                    >
                                                        {
                                                            districts.map( item => <option key={item.value} value={item.value}>{item.label}</option>)
                                                        }
                                                    </select>
                                                </div>
                                                {
                                                    otherDistrict(this.state.otherDistrict, this.handleChange, showOtherDistrict)
                                                }
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
