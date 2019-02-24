import React, { Component } from 'react';
import './messages.css';
import '../style.css';
import List from './List';
import MessagesDrawer from '../Drawer/messagesDrawer';
import Conversation from './Conversation';

class Messages extends Component {
  render(){
    return(
      <div>
        <MessagesDrawer />
      </div>
    )
  }
}

export default Messages
