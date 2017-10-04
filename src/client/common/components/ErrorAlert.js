import React from 'react';
import { Alert, Fade } from 'react-bootstrap';

class ErrorAlert extends React.Component {
    render() {
        const visible = !!this.props.errorMessage;

        if(this.props.dismissCallback){
            return (
                <div>
                    <Fade in={visible}>
                        <Alert bsStyle="danger" onDismiss={this.props.dismissCallback}>
                            <strong>Error: </strong>{this.props.errorMessage}
                        </Alert>
                    </Fade>
                </div>
            );
        } else {
            return (
                <div>
                    <Fade in={visible}>
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