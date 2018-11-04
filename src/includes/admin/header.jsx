import React, { Component } from 'react';


const header = () => {
    return (
        <div className="nnna">
            <nav className="navbar navbar-default navbar-static-top ">
                <div className="container">
                    <div className="navbar-header">

                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                            <span className="sr-only">Toggle Navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/">Web Admin</a>
                    </div>
                    <div className="collapse navbar-collapse" id="app-navbar-collapse">
                        <ul className="nav navbar-nav">&nbsp;</ul>
                        <ul className="nav navbar-nav navbar-left">
                                        
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="/query">Query</a></li>

                            <li><a href="/logout">Log Out</a></li>
                        </ul>				
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default header;