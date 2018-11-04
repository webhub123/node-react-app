import React, { Component } from 'react';

import axios from 'axios';
import session_checker from '../session/session_checker';

import '../assets/css/style.css';



class Register extends Component {

    state = {

        user_error : '',
        password_error : '',
        retype_error : '',
    };

    componentDidMount() {
        document.title = 'Register Page';

        session_checker()
        .then((res) => {
            if(res === true) {
            window.location.href = "/query";
            }
        })
        .catch(error => error)
    }


    validate = () => {

        const { username, password, retype } = this.refs;

        let user_error = '',password_error = '',retype_error = '';
    

        if(!username.value) {
            user_error = <b>This field is required.</b>;
        }

        if(!password.value) {
            password_error = <b>This field is required</b>;
        }

        if(!retype.value) {
            retype_error = <b>This field is required</b>;
        }

        if(username.value && username.value.length < 3) {
            user_error = <b>Username should be 4 characters long.</b>;
        }

        if(password.value !== retype.value) {
            password_error = <b>Password and Re-type password should be matched.</b>;
            retype_error = <b>Password and Re-type password should be matched.</b>;
        }
        
        if(user_error || password_error || retype_error) {
            this.setState({ user_error , password_error, retype_error } );
            return false;
        }   

        return true;
    }



    register(get_refs) {


        const valid = this.validate();

        if(valid === false) {
            return false;
        }
        
        const { username, password, retype } = get_refs;

        const data = { username : username.value, password : password.value };

        axios.post('/register/save', data)
        .then( (res) =>  {
    
          if(res.data.status === 'error') {
            alert(res.data.message);
          }else if(res.data.status === 'success') {
            alert('Successfully Saved.');
            window.location.reload();
          }
        })
        .catch( (error) => {
          console.log(error);
        });

    }

    render() { 

        const { user_error, password_error, retype_error } = this.state;
        
        return (
            <div className="container col-sm-offset-4 col-sm-4">
                <h3>Register Account</h3>
                <hr/>
                    <div className="form-group">
                        <label >Username:</label>
                        <div className="error-msg">{ user_error }</div>
                        <input type="text" className="form-control"  ref="username"   />
                    </div>
                   
                    <div className="form-group">
                        <label >Password:</label>
                        <div className="error-msg">{ password_error }</div>
                        <input type="password" className="form-control"  ref="password"  />
                    </div>

                    <div className="form-group">
                        <label >Re-type Password:</label>
                        <div className="error-msg">{ retype_error }</div>
                        <input type="password" className="form-control"  ref="retype"  />
                    </div>
                    <button onClick={ () => this.register(this.refs) } className="btn btn-primary">Register</button>
            </div>
        );
    }
  }
  
  export default Register;