import React, { Component } from 'react';
import './messages.css';
import '../style.css';
import List from './List';
import MessagesDrawer from './MessagesDrawer';
import Conversation from './Conversation';
import TextInput from './TextInput';

class Messages extends Component {
  state = {
    drawerDisplay: "block"
  }

  render(){
    return(
      <div>

          <MessagesDrawer/>

      

      </div>
    )
  }
}

export default Messages
