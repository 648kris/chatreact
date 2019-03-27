import React, { Component } from 'react';
import ChatInput from './ChatInput';
import Avatar from '@material-ui/core/Avatar';
import MessagesDrawer from '../MessagesDrawer/MessagesDrawer';
import { connect } from 'react-redux';
import * as actions from '../actions';


//const URL = 'ws://localhost:3030'

class Chat extends Component {

  state = {
    name: 'Bob',
    messages: [],
    user: 'km0520',
    m: [{sender:"Spot", timestamp: Number(Date.now()), messages: {text:"Woof! I'm a doggy!", timestamp:Number(Date.now())} }]
  }

  //ws = new WebSocket(URL)

  componentDidMount() {

    console.log("CHAT.js didmount")
    this.props.fetchUser();
    this.props.fetchMessages();

    if(this.props.messages){
       this.setState({m: this.props.messages})
    }

  /*  this.ws.onopen = () => {
      console.log('connected')
    }

    this.ws.onmessage = evt => {
      const message = JSON.parse(evt.data)
      this.addMessage(message)
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      this.setState({
        ws: new WebSocket(URL),
      })
    }*/
  }

  addMessage = message =>
    this.setState(state => ({ messages: [...state.messages, message] }))

  submitMessage = messageString => {
    console.log("LOGGING FROM SUBMITMESSAGE")
    console.log(this.props)
    const message = { name: this.state.name, message: messageString }
    //this.ws.send(JSON.stringify(message))
    this.addMessage(message)
  }



  render() {

    function sendMessage(message){
      if (message.name==="Bob"){
        return <div key={message.index+"a"} style={{overflow:"auto", marginTop:"-16px", marginBottom:"-26px"}}>
            <p style={{backgroundColor:"#e0e0e0", float:"left", borderRadius:"20px",
              paddingLeft:"4px", paddingRight:"4px", paddingBottom:"4px"}}>
              {message.message}
            </p>
          </div>
      }
      return <div key={message.index+"b"} style={{ display:"block", textAlign:"right", padding:"6px"}}>
        <p style={{backgroundColor:"#3f51b5", color:"white", borderRadius:"20px", paddingLeft:"4px", paddingRight:"4px",
        paddingBottom:"4px", display:"inline"}}>
          {message.message}
        </p>
      </div>
    }


    return (
      <div>
      <MessagesDrawer/>

      <div style={{maxWidth: "800px", marginLeft:"240px", marginTop:"-112px", padding:"4px", height:"100vh", backgroundColor:"white"}}>
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

function mapStateToProps(state) {
  return { auth: state.auth,
    messages:state.messages };
}

export default connect(mapStateToProps, actions)(Chat);
