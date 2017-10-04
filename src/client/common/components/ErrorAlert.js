import React from 'react';
import { Alert, Fade } from 'react-bootstrap';

class ErrorAlert extends React.Component {
    render() {
        if(this.props.dismissCallback){
            return (
                <div>
                    <Fade in={this.props.errorMessage}>
                        <Alert bsStyle="danger" onDismiss={this.props.dismissCallback}>
                            <strong>Error: </strong>{this.props.errorMessage}
                        </Alert>
                    </Fade>
                </div>
            );
        } else {
            return (
                <div>
                    <Fade in={this.props.errorMessage}>
                        <Alert bsStyle="danger">
                            <strong>Error: </strong>{this.props.errorMessage}
                        </Alert>
                    </Fade>
                </div>
            );
        }
    }
};

export default ErrorAlert;