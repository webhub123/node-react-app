import React, { Component } from 'react';

import Info from '../components/info';
import Info_edit from '../listing/info_edit';
import Home from '../home/home';
import Register from '../home/register';
import Login from '../home/login';
import Upload from '../home/upload';
import Send_email from '../home/send_email';

import Add_new from '../listing/info_add';
import Logout from '../home/logout';

import Error_page from '../error_page/error_404';


import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';

const routes = () => {

    return (
        <Router>
            <Switch>
                <Route exact path="/" component={ Home } />
                <Route exact path="/register" component={ Register } />
                <Route exact path="/login" component={ Login } />
                <Route exact path="/query" component={ Info } />
                <Route exact path="/add_new" component={ Add_new } />
                <Route exact path="/edit/:id" component={ Info_edit } />
                <Route exact path="/logout" component={ Logout } />
                <Route exact path="/upload" component={ Upload } />
                <Route exact path="/send_email" component={ Send_email } />
                <Route component={ Error_page } />
            </Switch>
        </Router>
    );
}

export default routes;
