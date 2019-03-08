import React, { Component } from 'react';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import Avatar from '@material-ui/core/Avatar';
import MessagesDrawer from '../MessagesDrawer/MessagesDrawer';

const URL = 'ws://localhost:3030'

class Chat extends Component {
  state = {
    name: 'Bobby',
    messages: [],
    user: 'km0520'
  }

  ws = new WebSocket(URL)

  componentDidMount() {

    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
    }

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data)
      //console.log("message = "+message)
      this.addMessage(message)
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL),
      })
    }
  }

  addMessage = message =>
    this.setState(state => ({ messages: [message, ...state.messages] }))

  submitMessage = messageString => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = { name: this.state.name, message: messageString }
    this.ws.send(JSON.stringify(message))
    this.addMessage(message)
  }

  render() {

    function sendMessage(message){
      if (message.name==="Bob"){
        return <div style={{ display:"block", paddingBottom:"10px", paddingTop:"10px"}}>
          <p style={{backgroundColor:"#e0e0e0", borderRadius:"20px", display:"inline", left:"0", padding:"6px", paddingBottom:"10px"}}>
            {message.message}
          </p>
        </div>
      }
      return <div style={{ display:"block", textAlign:"right", padding:"10px"}}>
        <p style={{backgroundColor:"#3f51b5", color:"white", borderRadius:"20px", padding:"6px", paddingBottom:"10px", display:"inline"}}>
          {message.message}
        </p>
      </div>
    }


    return (
      <div>
      <MessagesDrawer/>

      <div style={{maxWidth: "800px", marginLeft:"240px", marginTop:"-114px", padding:"5px", height:"100vh", backgroundColor:"white"}}>
      {this.state.messages.map((message, index) =>
        <div>
        {sendMessage(message)}
        </div>,
      )}
      </div>

        <ChatInput
          ws={this.ws}
          onSubmitMessage={messageString => this.submitMessage(messageString)}
        />

      </div>

    )
  }
}

export default Chat
