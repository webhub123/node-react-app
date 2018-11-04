import React from 'react';
import ReactDOM from 'react-dom';

import Router_Controller from './router/routes';

import App from './App';

import registerServiceWorker from './registerServiceWorker';


ReactDOM.render( 
    <React.Fragment>
        <App />
        <Router_Controller />
    </React.Fragment>
    , document.getElementById('root')
);
registerServiceWorker();
