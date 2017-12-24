import React from 'react';
import {Link} from 'react-router-dom'
import {logout} from '../../user/userActions';

class MainMenu extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">MBU Home</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Admin <span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><Link to="/admin/merit-badges">Setup Merit Badges</Link></li>
                                    <li><Link to="/admin/classrooms">Setup Classrooms</Link></li>
                                    <li><Link to="/admin/scheduled-courses">Schedule Courses</Link></li>
                                </ul>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Merit Badge Counselor<span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><Link to="/admin/merit-badge-courses">Setup Courses</Link></li>
                                </ul>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Venturer Instructor<span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><Link to="/admin/venturer-courses">Setup Courses</Link></li>
                                </ul>
                            </li>
                        </ul>

                        <ul className="nav navbar-nav">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Scout Master<span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><Link to="/students/register">Register Students</Link></li>
                                    <li><Link to="/students">View Students</Link></li>
                                </ul>
                            </li>
                        </ul>

                        <ul className="nav navbar-nav">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Crew Adviser<span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><Link to="/students/register">Register Students</Link></li>
                                    <li><Link to="/students">View Students</Link></li>
                                </ul>
                            </li>
                        </ul>

                        <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">My Profile <span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a href="#" onClick={logout}>Logout</a>
                                    </li>
                                    <li role="separator" className="divider"></li>
                                    <li><a href="#">Edit Profile</a></li>
                                    <li><a href="#">My Schedule</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        );
    }

};

export default MainMenu;


