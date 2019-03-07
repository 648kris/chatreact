import React, {Component} from 'react';
import './scroll.css';
import Conversation from '../Messages/Conversation';
import TextInput from '../Messages/TextInput';

class Scroll extends Component {
  render(){
    return(
      <div id="table-wrapper">
        <div id="table-scroll">
        <Conversation/>
        <TextInput/>
        </div>
      </div>
    )
  }
}

export default Scroll
