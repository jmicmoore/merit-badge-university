import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter} from 'react-router-dom'
import './common/components/MainMenu';
import MainMenu from "./common/components/MainMenu";
import MeritBadges from './admin/MeritBadges';
import Classrooms from './admin/Classrooms';
import Classes from './admin/Classes';
import EditClass from './admin/EditClass';
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
                    <Route path='/admin/classes' component={Classes}/>
                    <Route path='/admin/edit-class' component={EditClass}/>
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
