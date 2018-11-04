import React, { Component } from 'react';
import axios from 'axios';


class logout extends Component {

    componentDidMount() {
 

        axios.post('/logout') 
        .then( (res) =>  {
            localStorage.clear();
            window.location.href = '/';

        })
        .catch( (error) => {
          console.log(error);
        });

    }

    render() { 

        return(
            <h1></h1>
        );
        
    }
}
export default logout;