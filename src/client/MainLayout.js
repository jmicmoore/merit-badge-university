import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter} from 'react-router-dom'
import './common/components/MainMenu';
import MainMenu from "./common/components/MainMenu";
import MeritBadges from './admin/MeritBadges';
import Classrooms from './admin/Classrooms';
import MeritBadgeCourses from './admin/MeritBadgeCourses';
import EditMeritBadgeCourse from './admin/EditMeritBadgeCourse';
import VenturerCourses from './admin/VenturerCourses';
import EditVenturerCourse from './admin/EditVenturerCourse';
import ScheduledCourses from './admin/ScheduledCourses';
import EditScheduledCourse from './admin/EditScheduledCourse';
import Welcome from './user/Welcome';

// Gotta put the routes with params first or the one without will match
class Home extends React.Component {

    render() {
        const { match, location, history } = this.props;

        return (
            <div>
                <MainMenu/>
                <Switch>
                    <Route path='/admin/merit-badges' component={MeritBadges}/>
                    <Route path='/admin/classrooms' component={Classrooms}/>
                    <Route path='/admin/merit-badge-courses' component={MeritBadgeCourses}/>
                    <Route path='/admin/edit-merit-badge-course/:courseId' component={EditMeritBadgeCourse}/>
                    <Route path='/admin/edit-merit-badge-course' component={EditMeritBadgeCourse}/>
                    <Route path='/admin/venturer-courses' component={VenturerCourses}/>
                    <Route path='/admin/edit-venturer-course/:courseId' component={EditVenturerCourse}/>
                    <Route path='/admin/edit-venturer-course' component={EditVenturerCourse}/>
                    <Route path='/admin/scheduled-courses' component={ScheduledCourses}/>
                    <Route path='/admin/edit-scheduled-course/:scheduledCourseId' component={EditScheduledCourse}/>
                    <Route path='/admin/edit-scheduled-course' component={EditScheduledCourse}/>
                    <Route path="/welcome" component={Welcome}/>
                </Switch>
                <footer>
                    2015-17 Copyright &copy; mbu.com
                </footer>
            </div>
        );
    }
}

export default withRouter(connect()(Home));
