import React from "react"
import Person from './Person'

// this class is a list of People. It contains all the values retrieved from the 
// Get Method (sent when the App is loaded)
class PeopleList extends React.Component {
    render() {
        const p = this.props;
        return (
            <div className="peopleList">
            <span className="personPrint">Data Fetch From the Server </span>
            <br></br>
            {p.peopleArray.map(personInfo => <Person key = {personInfo.id} {...personInfo}/>)}
            </div>
        );
    }
}
// Loop throug the people array and Print all the information in the Person struct: 
// {p.peopleArray.map(personinfo => <Person key={personinfo.id} {...personinfo}/>)}
export default PeopleList;