import React, { Component } from 'react';


const footer = () => {
        
    return (
      <div className="navbar navbar-default navbar-fixed-bottom">
          <div className="container">
          <p className="navbar-text pull-left">© Web Practice -
              <a href="#" >Bootstrap 3</a>
          </p>
          
          <a href="#" className="navbar-btn btn-danger btn pull-right btn-sm">
            <span className="glyphicon glyphicon-star"></span>  Subscribe</a>
          </div>
      </div>
    );
    
  }
  
  export default footer;