import React, { Component } from 'react';
import axios from 'axios';


const session_checker = () => {

    return axios.post('/session_checker') 
      .then(res => res.data.session_status)
      .catch(err => err)

};


  
export default session_checker;