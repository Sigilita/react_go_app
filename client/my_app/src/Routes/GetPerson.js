import React from "react";
import Person from '../Component/Person'

class GetPerson extends React.Component {
    constructor(props){
        super(props)
        console.log("Get Person Constructor")
        this.state = {
          apiResponse: ""
        };
      }
    
      callAPI(){
        fetch("http://localhost:8000/app/people/1")
        .then( response => response.json()
            .then(data=>{
                this.setState({
                    apiResponse : data
            })}))
      }
    
      componentDidMount(){
        this.callAPI();
      }

      handleSubmit = e => {
        e.preventDefault();
        const data = new FormData(e.target);
        var index;
        data.forEach((value, ) => {
            index = value 
        });

        fetch("http://localhost:8000/app/people/" + index ,{
          method: 'GET'
        })
        .then( response => response.json()
            .then(data=>{
                this.setState({
                    apiResponse : data
            })}))

            e.target.elements.id.value="";
    }

      handleFields = e =>this.setState({[e.target.name]: e.target.value});
    
      render() {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
            <h2>Search Person</h2>
            <div className="searchfor">
                <label htmlFor="id">Id</label>
                <input  type="text" 
                        className="form-control" 
                        name="id"
                        placeholder="Id" 
                        value={this.state.id}
                        onChange={this.handleFields} />
            </div>
            <button type="submit" className="submit-btn">Submit</button>
        
            <div>
            <div className="peopleList">
                <Person key = {this.state.apiResponse.id} {...this.state.apiResponse}/>
            </div>
            </div>
            </form>
        )
    }
}

export default GetPerson;