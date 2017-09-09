import React from 'react';
import {connect} from 'react-redux';
import {setField} from './registerActions';

class Register extends React.Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

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
                                                    <label htmlFor="firstNameInputRegistration">First Name <span className="text-danger">*</span></label>
                                                    <input
                                                        value={this.props.firstNameInputRegistration}
                                                        type="firstNameInputRegistration"
                                                        className="form-control"
                                                        id="firstNameInputRegistration"
                                                        placeholder="First Name"
                                                        onChange={(event) => {
                                                            this.handleChange('firstNameInputRegistration', event.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <div className="form-group">
                                                    <label htmlFor="lastNameInputRegistration">Last Name <span className="text-danger">*</span></label>
                                                    <input
                                                        value={this.props.lastNameInputRegistration}
                                                        type="lastNameInputRegistration"
                                                        className="form-control"
                                                        id="lastNameInputRegistration"
                                                        placeholder="Last Name"
                                                        onChange={(event) => {
                                                            this.handleChange('lastNameInputRegistration', event.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="col-sm-6 col-xs-12">
                                                <div className="form-group">
                                                    <label htmlFor="inputEmailRegistration">Email address <span className="text-danger">*</span></label>
                                                    <input
                                                        value={this.props.inputEmailRegistration}
                                                        type="inputEmailRegistration"
                                                        className="form-control"
                                                        id="inputEmailRegistration"
                                                        placeholder="Email"
                                                        onChange={(event) => {
                                                            this.handleChange('inputEmailRegistration', event.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <div className="form-group">
                                                    <label htmlFor="inputEmailRegistrationConfirmation">Confirm Email address <span className="text-danger">*</span></label>
                                                    <input
                                                        value={this.props.inputEmailRegistrationConfirmation}
                                                        type="inputEmailRegistrationConfirmation"
                                                        className="form-control"
                                                        id="inputEmailRegistrationConfirmation"
                                                        placeholder="Email"
                                                        onChange={(event) => {
                                                            this.handleChange('inputEmailRegistrationConfirmation', event.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="col-sm-6 col-xs-12">
                                                <div className="form-group">
                                                    <label htmlFor="inputPasswordRegistration">Password <span className="text-danger">*</span></label>
                                                    <input
                                                        value={this.props.inputPasswordRegistration}
                                                        type="inputPasswordRegistration"
                                                        className="form-control"
                                                        id="inputPasswordRegistration"
                                                        placeholder="Password"
                                                        onChange={(event) => {
                                                            this.handleChange('inputPasswordRegistration', event.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <div className="form-group">
                                                    <label htmlFor="confirmInputPasswordRegistration">Confirm Password <span className="text-danger">*</span></label>
                                                    <input
                                                        value={this.props.confirmInputPasswordRegistration}
                                                        type="confirmInputPasswordRegistration"
                                                        className="form-control"
                                                        id="confirmInputPasswordRegistration"
                                                        placeholder="Confirm Password"
                                                        onChange={(event) => {
                                                            this.handleChange('confirmInputPasswordRegistration', event.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="col-sm-4 col-xs-12">
                                                <div className="form-group">
                                                    <label htmlFor="scoutTypeRegistration">Who are You? <span className="text-danger">*</span></label>
                                                    <select
                                                        value={this.props.scoutTypeRegistration}
                                                        className="form-control form-control-lg"
                                                        id="scoutTypeRegistration"
                                                        onChange={(event) => {
                                                            this.handleChange('scoutTypeRegistration', event.target.value);
                                                        }}
                                                    >
                                                        <option value='BoyScout'>Boy Scout</option>
                                                        <option value='VentureScout'>Venture Scout</option>
                                                        <option value='ScoutMaster'>Scout Master / Adult Leader</option>
                                                        <option value='CrewAdviser'>Crew Adviser / Adult Leader</option>
                                                        <option value='MeritBadgeCounselor'>Merit Badge Counselor</option>
                                                        <option value='YoungAdultInstructor'>Youth / Young Adult Instructor</option>
                                                        <option value='Parent'>Parent</option>
                                                        <option value='Staff'>Staff</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-xs-12">
                                                <div className="form-group">
                                                    <label htmlFor="councilRegistration">What Council Are You From? <span className="text-danger">*</span></label>
                                                    <select
                                                        value={this.props.councilRegistration}
                                                        className="form-control form-control-lg"
                                                        id="councilRegistration"
                                                        onChange={(event) => {
                                                            this.handleChange('councilRegistration', event.target.value);
                                                        }}
                                                    >
                                                        <option value='GSLAC'>Greater St. Louis Area Council (GSLAC)</option>
                                                        <option value='Other'>Other</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="otherInputCouncilName">Other</label>
                                                    <input type="otherInputCouncilName" className="form-control" id="otherInputCouncilName" placeholder="Other"/>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-xs-12">
                                                <div className="form-group">
                                                    <label htmlFor="districtRegistration">What District Are You From? <span className="text-danger">*</span></label>
                                                    <select
                                                        value={this.props.districtRegistration}
                                                        className="form-control form-control-lg"
                                                        id="districtRegistration"
                                                        onChange={(event) => {
                                                            this.handleChange('districtRegistration', event.target.value);
                                                        }}
                                                    >
                                                        <option value='BigMuddy'>Big Muddy</option>
                                                        <option value='BlackGold'>Black Gold</option>
                                                        <option value='BooneTrails'>Boone Trails</option>
                                                        <option value='CahokiaMounds'>Cahokia Mounds</option>
                                                        <option value='Cherokee'>Cherokee</option>
                                                        <option value='Egyptian'>Egyptian</option>
                                                        <option value='GrandTowers'>Grand Towers</option>
                                                        <option value='GravoisTrail'>Gravois Trail</option>
                                                        <option value='Kaskaskia'>Kaskaskia</option>
                                                        <option value='NewHorizons'>New Horizons</option>
                                                        <option value='NorthStar'>North Star</option>
                                                        <option value='Osage'>Osage</option>
                                                        <option value='OzarkTrailblazers'>Ozark Trailblazers</option>
                                                        <option value='Pathfinder'>Pathfinder</option>
                                                        <option value='PisaBird'>Pisa Bird</option>
                                                        <option value='RiverTrails'>River Trails</option>
                                                        <option value='Shawnee'>Shawnee</option>
                                                        <option value='Sioux'>Sioux</option>
                                                        <option value='StClair'>St. Clair</option>
                                                        <option value='Thunderbird'>Thunderbird</option>
                                                        <option value='Other'>Other</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="otherInputDistrictName">Other</label>
                                                    <input type="otherInputDistrictName" className="form-control" id="otherInputDistrictName" placeholder="Other"/>
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
