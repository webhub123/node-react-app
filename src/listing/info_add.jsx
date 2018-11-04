import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';


class Info_Add extends Component {


    // state = {
    //     gender_sel : ''
    // }

    componentDidMount() {
        document.title = 'Add New';
    }

    click_save = (getrefs) => {

        const { name, age, address, gender } = getrefs;
        this.save_info(name.value,age.value,address.value,gender.value);
    }
    
    save_info = (name,age,address,gender) => {
    
        const data = { name : name, age : age, address : address, gender : gender };
    
        axios.post('/list/save', data)
        .then( (res) =>  {
    
          if(res.data.status === 'error') {
    
            alert(res.data.message);
          }else if(res.data.status === 'success') {
    
            alert('Successfully Saved.');
            window.location.href = "/query";
          }
        })
        .catch( (error) => {
          console.log(error);
        });
     
      }

    //   handleChange = (gender_sel) => {
    //     this.setState({ gender_sel : gender_sel.value });
        
    //   }

    render() { 
        
        return (
            <div className="container col-sm-offset-4 col-sm-4">
                <h3>Add new </h3>
                <hr/>
                <div className="form-group">
                    <label >Full Name:</label>
                    <input type="text" className="form-control" ref="name"   />
                </div>
                <div className="form-group">
                    <label >Age:</label>
                    <input type="text" className="form-control" ref="age"   />
                </div>

                <div className="form-group">
                    <label >Gender:</label>
                    {/* <Select options={[
                        {value : 'Male', label : 'Male' },
                        {value : 'Female', label : 'Female' },
                    ]}
                    onChange={this.handleChange}
                    /> */}

                    <select className="form-control" ref="gender"  >
                        <option value=""></option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div className="form-group">
                    <label >Address:</label>
                    <input type="text" className="form-control" ref="address"    />
                </div>
                <div className="btn-group">
                    <button onClick={ () => this.click_save(this.refs) } className="btn btn-success">Save</button>
                    <a href="/query" className="btn btn-warning" >Cancel</a>
                </div>
            </div>
        );
    }
  }
  
  export default Info_Add;