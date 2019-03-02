import React, { Component } from 'react';
import './messages.css';
import '../style.css';
import MessagesDrawer from '../MessagesDrawer/MessagesDrawer';
import Conversation from './Conversation';
import TextInput from './TextInput';
import Scroll from '../Scroll/Scroll';

class Messages extends Component {
  state = {
    drawerDisplay: "block"
  }

  render(){
    return(
      <div>
        <MessagesDrawer/>
        <Scroll/>
      </div>
    )
  }
}

export default Messages
