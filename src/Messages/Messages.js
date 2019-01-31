import React, { Component } from 'react';
import './messages.css';
import '../style.css'
import List from './List';
import Conversation from './Conversation';

class Messages extends Component {
  render(){
    return(
      <div className="tealBackground">
          <List />
          <Conversation />
      </div>
    )
  }
}

export default Messages
