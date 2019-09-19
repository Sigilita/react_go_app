import React, {Component} from "react"
import './App.css';
import Home from './Routes/Home'
import AddPerson from './Routes/AddPerson'
import UpdatePerson from './Routes/UpdatePerson'
import DeletePerson from './Routes/DeletePerson'
import GetPerson from './Routes/GetPerson'
import Sort from './Routes/Sort'
import { BrowserRouter,Route,Switch, Link } from 'react-router-dom';     

class App extends Component{
  render() {
    return(
      <div className="App-body">
      <BrowserRouter>
          <Link to="/">Home</Link>
          <Link to="/get">Get Person</Link>
          <Link to="/sort">Get by email</Link>
          <Link to="/add">Add</Link>
          <Link to="/update">Update</Link>
          <Link to="/delete">Delete</Link>
      <Switch>
          <Route exact path="/update" component={UpdatePerson}/>
          <Route exact path="/delete" component={DeletePerson}/>
          <Route exact path="/add" component={AddPerson}/>
          <Route exact path="/get" component={GetPerson}/>
          <Route exact path="/sort" component={Sort}/>
          <Route exact path="/" component={Home}/>
      </Switch>
      </BrowserRouter>
      </div>
    );   
  }
}

export default App;