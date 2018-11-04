import React, { Component } from 'react';

import '../assets/css/style.css';
import axios from 'axios';


class Send_email extends Component {


    state = {
        btn_disb : false,
    }

 
    sent_email = () => {

        const { to, message } = this.refs;
        const data = { to : to.value, message : message.value };

        axios.post('/sent_email', data, {
            onUploadProgress: ProgressEvent => {
                this.setState({ btn_disb : true })
            },
        })
        .then( (res) =>  {
    
          if(res.data.status === true) {
            this.setState({ btn_disb : false });
          }else {
              console.log(res.data.error_message);
          }
        })
        .catch( (error) => {
          console.log(error);
        });
        
    }

    render() { 

        const { btn_disb } = this.state;

        return (
            <div className="container col-sm-offset-4 col-sm-4">
                <h3>Send Email </h3>
                <hr/>
                <div className="form-group">
                    <label >To:</label>
                    <input type="email" className="form-control" ref="to" placeholder="example@domain.com" />
                </div>
                <div className="form-group">
                    <label >Message:</label>
                    <textarea className="form-control" ref="message" ></textarea>
                </div>

                <button disabled={btn_disb} onClick={ () => this.sent_email() } className="btn btn-primary">Send</button>
                
            </div>
        );
    }
  }
  
  export default Send_email;