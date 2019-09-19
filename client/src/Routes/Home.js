import React from "react";
import PeopleList from '../Component/PersonList'

class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          apiResponse: [],
          peopleArray: []
        };
      }
    
      callAPI(){
        fetch("http://localhost:8000/app/people/all")
        .then( response => response.json())
        .then(
            // handle the result
            (result) => {
                this.setState({
                    apiResponse : result
                });
            },
            // Handle error 
            (error) => {
                this.setState({
                    error
                })
            },
        )
    
      }
    
      componentDidMount(){
        this.callAPI();
      }
    render() {
        return (
        <div>
          <div>
            <PeopleList peopleArray = {this.state.apiResponse}/>
          </div>
        </div>)
    }
}

export default Home;