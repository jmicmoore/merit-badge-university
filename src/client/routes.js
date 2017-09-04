import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import App from './App';

const Routes = () => {
    return (
        <BrowserRouter basename='/merit-badge-university'>
            <App/>
        </BrowserRouter>
    );
};

export default Routes;




