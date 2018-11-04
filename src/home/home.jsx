import React, { Component } from 'react';

import session_checker from '../session/session_checker';
import Admin from '../home/admin/home';

class Home extends Component {

  state = { 
    session_status : null,
  };


  componentWillMount() {

    if(localStorage.getItem('id')) {
      document.title = 'Admin Page';
    }else {
      document.title = 'Home Page';
    }
    this.state.session_status = localStorage.getItem('id');
    // session_checker()
    // .then((res) => {
    //   this.setState( { session_status : res } )

    //   if(this.state.session_status === true) {
    //     document.title = 'Admin Page';

    //   }else {
    //     document.title = 'Home Page';
    //   }
    // })
    // .catch(error => error)

  } 

  
  render() { 

    let nav;

    if(this.state.session_status !== null) {
      nav = (
        <Admin />
      );
    }else{
      nav = (
        <div className="jumbotron text-center">
          <h2>Public Page</h2>
          <p>Bootstrap 3</p> 
        </div>
      );
    }


    return(
      <div>
        { nav }
      </div>
    );
      

  }
}



  
  export default Home;