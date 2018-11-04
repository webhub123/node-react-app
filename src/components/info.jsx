import React, { Component } from 'react';

import Info_list from '../listing/info_list';
import axios from 'axios';
import session_checker from '../session/session_checker';


class info extends Component {
  
  state = {
    list : [],
    offset : 0,
    limit : 5,
    total_row : 0
  };


  componentDidMount() {

    const { limit, offset } = this.state;
 
    this.index(limit,offset,'');


    session_checker()
    .then((res) => {
      if(res !== true) {
        window.location.href = "/";
      }
    })
    .catch(error => error)

    document.title = 'Query List';
  }


  index = (limit, offset, search) => {

    const data = { limit : limit, offset : offset, search : search }

    axios.post('/list/',data) 
    .then(res => {
      this.setState({list : res.data, total_rows : res.data[0].total_rows });
    })
    .catch(err => err)

  }

  search_user = (e,search) => {

    if(e.key === 'Enter' || ( search.length <= 1 && e.keyCode == 8) ){
      
      const { limit, offset } = this.state;

      this.index(limit, offset, search);
    }
  }


  delete_user = (id) => {

    axios.delete('/list/delete/'+id)
    .then( (res) =>  {
      alert('Successfully Deleted.');
      window.location.reload();
    })
    .catch( (error) => {
      console.log(error);
    });
  }

  render() { 
    
    const { list, total_rows, limit } = this.state;

    return (
      <div>
       <Info_list 
        list={list} 
        limit = {limit} 
        total_rows = {total_rows} 
        load_list={this.index} 
        delete_user={this.delete_user} 
        search_user={this.search_user}  
       />
      </div>
    );
  }
}

export default info;
