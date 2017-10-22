import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter} from 'react-router-dom'
import './common/components/MainMenu';
import MainMenu from "./common/components/MainMenu";
import MeritBadges from './admin/MeritBadges';
import Classrooms from './admin/Classrooms';
import ScheduledCourses from './admin/ScheduledCourses';
import EditScheduledCourse from './admin/EditScheduledCourse';
import MeritBadgeCourses from './admin/MeritBadgeCourses';
import EditMeritBadgeCourse from './admin/EditMeritBadgeCourse';
import Welcome from './user/Welcome';

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
