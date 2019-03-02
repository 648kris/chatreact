import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Messages from './Messages/Messages';
import Signin from './Signin/Signin';
import Scroll from './Scroll/Scroll';

class App extends Component {
  render() {
    return (
      <div>
      <BrowserRouter>
        <Route path="/" exact="true" component={Messages}/>
      </BrowserRouter>

      <BrowserRouter>
        <Route path="/login" exact="true" component={Signin}/>
      </BrowserRouter>

      <BrowserRouter>
        <Route path="/messages" exact="true" component={Messages}/>
      </BrowserRouter>

      <BrowserRouter>
        <Route path="/test" exact="true" component={Scroll}/>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
