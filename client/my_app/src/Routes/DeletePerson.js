import React, { Component } from 'react';

// Form class. This form contains all the parameters needed for the creation of
// a person. The class also performs validation on the client side
class DeletePerson extends Component {
  constructor (props) {
    super(props);
    this.state = {
        id:''
        };
  }
  
  handleSubmit(event){
    event.preventDefault();
    const data = new FormData(event.target);
    var index;
    data.forEach((value, ) => {
        index = value 
    });
    fetch("http://localhost:8000/app/people/" + index ,{
      method: 'DELETE'
    })
    //Reset the value after the submission. I tried using the state but I got
    //some problems and is 23.41
    event.target.elements.id.value="";
}

handleFields = e =>this.setState({[e.target.name]: e.target.value});

  render () {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <h2>Delete Person</h2>
        <div className="deleteform">
            <label htmlFor="id">Id</label>
            <input  type="text" 
                    className="form-control" 
                    name="id"
                    placeholder="Id" 
                    value={this.state.id}
                    onChange={this.handleFields} />
        </div>
        <button type="submit" className="delete-btn">Delete</button>
      </form>
    );
  }
}

export default DeletePerson