import React from 'react';
import { Alert } from 'react-bootstrap';

class ErrorAlert extends React.Component {
    render() {
        if (this.props.errorMessage) {
            if(this.props.dismissible){
                return (
                    <div>
                        <br/>
                        <Alert bsStyle="danger" onDismiss={this.props.dismissCallback}>
                            <strong>Error: </strong>{this.props.errorMessage}
                        </Alert>
                    </div>
                );
            } else {
                return (
                    <div>
                        <br/>
                        <Alert bsStyle="danger">
                            <strong>Error: </strong>{this.props.errorMessage}
                        </Alert>
                    </div>
                );
            }
        } else {
            return (<div></div>);
        }
    }
};

export default ErrorAlert;