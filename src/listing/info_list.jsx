import React, { Component } from 'react';

import '../assets/css/style.css';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

import ReactPaginate from 'react-paginate';


class info_list extends Component {
  
  constructor() {
    super();

    this.state = {
      value : '',
      suggestions : [],
      list : []
    }
  } 



  getSuggestionValue = suggestion => suggestion.name;

  renderSuggestion = (suggestion) => (
    <div>
      {suggestion.name}
    </div>
  );


  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {

    axios.get('/get_ac_list/'+value)
    .then( (res) =>  {
      this.setState({
        suggestions: res.data
      });
    })
    .catch( (error) => {
      console.log(error);
    });
  };


  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });

  };

  handlePageClick = (data) => {

    const { limit, load_list } = this.props;

    let selected = data.selected;
    let offset = Math.ceil(selected * limit);

    load_list(limit, offset, this.state.value);
  };


  render() { 
    
    const { list, delete_user, search_user, total_rows, limit } = this.props;

    const total_page = Math.ceil(total_rows / limit);

    //for autocomplete
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Type a keyword...',
      value,
      className : 'form-control',
      onChange: this.onChange,
      onKeyDown: e => search_user(e,value),
      tabIndex : '1',
    };
    //for autocomplete



    return ( 
      <div className="container">
          <div className="row ">
            <h3 className="col-sm-2">Query List </h3>

            <a href="/add_new" className="btn btn-primary btn-sm pull-right btn-mrg-top" >Add New</a>
          </div>
          
          <hr/>
          <div className="row ">
            <div className="col-sm-4">
              <Autosuggest
                suggestions={suggestions}
                getSuggestionValue={this.getSuggestionValue}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
              />
            </div>

          </div>
          <br/>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>AGE</th>
                <th>ADDRESS</th> 
                <th className="text-center">ACTION</th>
              </tr>   
            </thead>
            <tbody> 
              { list.map(ls => (
                <tr key={ls.id}>
                    <td>{ls.id}</td>
                    <td>{ls.fullname}</td>
                    <td>{ls.age}</td>
                    <td>{ls.address}</td>
                    <td className="text-center">
                      
                      <div className="btn-group">
                        <a className="btn btn-primary btn-sm" href={'edit/'+ls.id} >Edit</a>
                        <button className="btn btn-danger btn-sm" onClick={ () => delete_user(ls.id) } >Delete</button>
                      </div>
                    </td>
                </tr>
              )) }
            </tbody>
          </table>
          <br/>    
          <ReactPaginate previousLabel={"Prev"}
                       nextLabel={"Next"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageCount={total_page}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} 
            />
      </div>

    );
  }
}

export default info_list;
