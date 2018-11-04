import React, { Component } from 'react';

import '../assets/css/style.css';
import axios from 'axios';

class Upload extends Component {

    constructor() {
        super();

        this.state = {
            loaded : 0
        }
    }

    send_upload_file = () => {

        const { file } = this.refs;
        let form_data = new FormData();

        form_data.append('file', file.files[0],  file.files[0].name);

        axios.post('/upload_file/', form_data, {
          onUploadProgress: ProgressEvent => {
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
            })
          },
        })
        .then(res => {
          alert('Successfully Uploaded');
        })
    }

    render() { 
        
        const { loaded } = this.state;

        return (
            <div className="container col-sm-offset-4 col-sm-4">
                <h3>Upload </h3>
                <hr/>
                <div className="form-group">
                    <label >Select File:</label>
                    <input type="file" ref="file"  />
                </div>
                <button onClick={ this.send_upload_file } className="btn btn-primary">Upload</button>
                <div> {Math.round(loaded,2) } %</div>
            </div>
        );
    }
  }
  
  export default Upload;