import React, { Component } from 'react';


import Header from './includes/header';
import Admin from './includes/admin/header';
import Footer from './includes/footer';
import session_checker from './session/session_checker';

// import reducers from './reducers';

// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';

// const createStoreWithMiddleware = applyMiddleware()(createStore);
// const store = createStoreWithMiddleware(reducers);

class App extends Component {
  
  state = { 
    session_status : null,
  };
 
  componentWillMount() {
    
    // session_checker()
    // .then((res) => {
    //     this.setState( { session_status : res } )
    // })
    // .catch(error => error)

    this.state.session_status = localStorage.getItem('id');

  }

  render() { 

    let nav;
 

    if(this.state.session_status !== null) {

      nav = (
        <React.Fragment>
          <Admin />
          <Footer />
        </React.Fragment>
      );

    }else {
 
      nav = (
        <React.Fragment>
            <Header />
          <Footer />
        </React.Fragment>
      );       

    }

    return(
      <div>
        { nav }
      </div>
    );


  }
}

export default App;
