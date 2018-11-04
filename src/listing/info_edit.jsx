import React, { Component } from 'react';

import axios from 'axios';
import Select from 'react-select';


class info_edit extends Component {
  
  state = {
      name : '',
      age : '',
      address : '',
      id : '',
      gender : '',
    };
  

  componentDidMount() {

    const id = this.props.match.params.id;
    document.title='Update Page';

    axios.get('/list/'+id)
    .then( (res) =>  {

      if(res.data.length === 0) {
        window.location.href = "/add_user";
        return false;
      }
      this.setState({ 
        name : res.data[0].fullname,
        age : res.data[0].age,
        address : res.data[0].address,
        id : res.data[0].id,
        gender : res.data[0].gender ,
      }); 
    })
    .catch( (err) => {
      console.log(err);
    });

  }

  update_user = (getrefs) => {
   
    const { name, age, address, gender } = getrefs;

    var data = { name : name.value, age : age.value, address : address.value, gender : gender.value };
  
    axios.put('/list/update/'+this.state.id, data)
    .then( (res) =>  {
      console.log(res.data);

      if(res.data.status == 'success') {
        alert('Successfully Updated');
        window.location.href = "/query";
      }

    })
    .catch( (error) => {
      console.log(error);
    });

  }

  change_handler(evt){

    this.setState({
        [evt.name]: [evt.value],
    });
  }



  render() { 

    const {name,age,address,gender} = this.state;

    return ( 
      <div className="container col-sm-offset-4 col-sm-4">
        <h3>Update </h3>
        <hr/>
        <div className="form-group">
          <label >Full Name:</label>
          <input type="text" className="form-control" ref="name" name="name" value={name} onChange={e => this.change_handler(e.target)}  />
        </div>
        <div className="form-group">
          <label >Age:</label>
          <input type="text" className="form-control" ref="age" name="age" value={age} onChange={e => this.change_handler(e.target)}  />
        </div>

        <div className="form-group">
          <label >Gender:</label>
          <select className="form-control" ref="gender" name="gender" value={gender} onChange={e => this.change_handler(e.target)} >
            <option value=""></option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label >Address:</label>
          <input type="text" className="form-control" ref="address" name="address" value={address} onChange={e => this.change_handler(e.target)}  />
        </div>
        <div className="btn-group">
          <button onClick={ () => this.update_user(this.refs)} className="btn btn-primary">Update</button>
          <a href="/query" className="btn btn-warning" >Cancel</a>
        </div>
        
      </div>
    );
  }
}

export default info_edit;
