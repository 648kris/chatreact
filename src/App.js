import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from './actions';

import './App.css';
import Messages from './WebSocket/Chat';
import Signin from './Signin/Signin';
import Chat from './WebSocket/Chat';
import CreateUser from './CreateUser/CreateUser';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
      <BrowserRouter>
        <Route path="/" exact={true} component={CreateUser}/>
      </BrowserRouter>

      <BrowserRouter>
        <Route path="/login" exact={true} component={Signin}/>
      </BrowserRouter>

      <BrowserRouter>
        <Route path="/createaccount" exact={true} component={CreateUser}/>
      </BrowserRouter>

      <BrowserRouter>
        <Route path="/messages" exact={true} component={Messages}/>
      </BrowserRouter>

      <BrowserRouter>
        <Route path="/test" exact={true} component={Chat}/>
      </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
