import React, {Component} from "react"
import './App.css';
import Home from './Routes/Home'
import AddPerson from './Routes/AddPerson'
import UpdatePerson from './Routes/UpdatePerson'
import DeletePerson from './Routes/DeletePerson'
import { BrowserRouter,Route,Switch, Link } from 'react-router-dom';     

class App extends Component{
  render() {
    return(
      <BrowserRouter>
      <div>
          <Link to="/">Home</Link>
          <Link to="/add">Add</Link>
          <Link to="/update">Update</Link>
          <Link to="/delete">Delete</Link>
      </div>
      <Switch>
          <Route exact path="/update" component={UpdatePerson}/>
          <Route exact path="/delete" component={DeletePerson}/>
          <Route exact path="/add" component={AddPerson}/>
          <Route exact path="/" component={Home}/>
      </Switch>
      </BrowserRouter>
    );   
  }
}

export default App;