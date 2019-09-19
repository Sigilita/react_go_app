import React from "react"
import Checkbox from './checkbox'

// This struct contains the data of a Person and renders the information 
// on the front end app
class Person extends React.Component{
    render(){
        const props = this.props;
        return(
            <div className="person">
                <div className="personInfo">
                <div><Checkbox id={props.id}/></div>
                <div className="id">Id:{props.id}</div>
                <div className="name">Name:{props.name}</div>
                <div className="balance">Balance:{props.balance}</div>
                <div className="age">Age:{props.age}</div>
                <div className="address">Address:{props.address}</div>
                <div className="email">Email:{props.email}</div>
                </div>
            <br></br>    
            </div>
            
        );
    }
}

export default Person;