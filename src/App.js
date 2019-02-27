import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Landing from './Landing/Landing';
import Createaccount from './Createaccount/Createaccount';
import Login from './Login/Login';
import Messages from './Messages/Messages';
import TextInput from './Messages/TextInput';

class App extends Component {
  render() {
    return (
      <div>
      <BrowserRouter>
        <Route path="/" exact="true" component={Landing}/>
      </BrowserRouter>

      <BrowserRouter>
        <Route path="/createaccount" exact="true" component={Createaccount}/>
      </BrowserRouter>

      <BrowserRouter>
        <Route path="/login" exact="true" component={Login}/>
      </BrowserRouter>

      <BrowserRouter>
        <Route path="/messages" exact="true" component={Messages}/>
      </BrowserRouter>

      <BrowserRouter>
        <Route path="/test" exact="true" component={TextInput}/>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
