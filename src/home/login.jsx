import React, { Component } from 'react';

import session_checker from '../session/session_checker';

import '../assets/css/style.css';

import axios from 'axios';

class Login extends Component {


    state = {
        user_error : '',
        pass_error : '',
    }


    componentDidMount() {
        document.title = 'Login Page';

        session_checker()
        .then((res) => {
            if(res === true) {
            window.location.href = "/query";
            }
        })
        .catch(error => error)
    } 

    validate = () => {

        const { username , password } = this.refs;

        let user_error='',pass_error='';

        if(!username.value) {
            user_error = <b>This field is required.</b>;
        }
        if(!password.value) {
            pass_error = <b>This field is required.</b>;
        }

        if(user_error || pass_error) {
            this.setState( { user_error, pass_error } );
            return false;
        }

        return true;
    }


    log_checker(getrefs) {

        const valid = this.validate();

        if(valid === false) {
            return false;
        }

        const { username, password } = getrefs;
        const data = { username : username.value, password : password.value };

        axios.post('/log_checker', data)
        .then( (res) =>  {
            
          if(res.data.status === 'success') {
            alert('Successfully Log In.');

            localStorage.setItem('id',res.data.id);

            window.location.href = "/";
          }
        })
        .catch( (error) => {
            alert('Invalid Username or Password.');
        });
    }   

    render() { 
        
        const { user_error, pass_error } = this.state;

        return (
            <div className="container col-sm-offset-4 col-sm-4">
                <h3>Login </h3>
                <hr/>
                <div className="form-group">
                    <label >Username:</label>
                    <div className="error-msg"> { user_error } </div>
                    <input type="text" className="form-control" ref="username"  />
                </div>
                <div className="form-group">
                    <label >Password:</label>
                    <div className="error-msg"> { pass_error } </div>
                    <input type="password" className="form-control" ref="password"  />
                </div>
                <button onClick={()=> this.log_checker(this.refs)} className="btn btn-primary">Log In</button>
            </div>
        );
    }
  }
  
  export default Login;