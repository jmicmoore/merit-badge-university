import React from 'react';
import {connect} from 'react-redux';

class Welcome extends React.Component {

    render() {

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <header>
                            <h1 className="text-center success">Welcome to Merit Badge University 2018</h1>
                        </header>
                        <div className="container">
                            <div className="row" id="form-container">

                                <div className="col-sm-offset-2 col-sm-8 col-xs-12 well">
                                    <h2 className="text-primary text-center">Welcome</h2>
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

export default connect(mapStateToProps)(Welcome);
