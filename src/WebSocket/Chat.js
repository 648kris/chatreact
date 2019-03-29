import React, { Component } from 'react';
import ChatInput from './ChatInput';
import Avatar from '@material-ui/core/Avatar';
import MessagesDrawer from '../MessagesDrawer/MessagesDrawer';
import { connect } from 'react-redux';
import * as actions from '../actions';


//const URL = 'ws://localhost:3030'

class Chat extends Component {

  state = {
    messages: [ {username:"Username", timestamp: Number(Date.now()), text: "sendMessages placeholder"},
    {username:"Username2", timestamp: Number(Date.now()), text: "sendMessages placeholder2"} ]
}

  //ws = new WebSocket(URL)

  componentDidMount() {

    console.log("CHAT.js didmount")
    this.props.fetchUser();
    this.props.fetchMessages();

    if(this.props.messages.length > 0){
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


  //addMessage = message =>
    //this.setState(state => ({ messages: [...state.messages, message] }))

  newMessage = (messageString, username) => {
    console.log("LOGGING FROM SUBMITMESSAGE")
    console.log(this.props)
    let messages = this.state.messages;
    //append new message to messages
    let newMessagesObj = {username: username, timestamp: Number(Date.now()), text: messageString}
    let newMessages = messages.push(newMessagesObj)
    //update state
    this.setState({messages: newMessages})
    //this.ws.send(JSON.stringify(message))
    //this.addMessage(message)
  }

  testFunction = (e) => {
    console.log("input e = ")
    console.log(e)
    console.log(this.props.auth.username)
    let messages = this.state.messages;
    let newMessage = {username: this.props.auth.username, timestamp: Number(Date.now()), text: e};
    messages.push(newMessage)
    console.log("messages = ")
    console.log(messages)
    this.setState({messages: messages})
  }

  sendMessage = (message) => {
        if(this.props){
          if(this.props.auth){
            if (message.username===this.props.username){
              return <div key={message.index+"a"} style={{overflow:"auto", marginTop:"-16px", marginBottom:"-26px"}}>
                <p style={{backgroundColor:"#e0e0e0", float:"left", borderRadius:"20px",
                  paddingLeft:"4px", paddingRight:"4px", paddingBottom:"4px"}}>
                  {message.text}
                </p>
              </div>
            }
          }
        }
        return <div key={message.index+"b"} style={{ display:"block", textAlign:"right", padding:"6px"}}>
          <p style={{backgroundColor:"#3f51b5", color:"white", borderRadius:"20px", paddingLeft:"4px", paddingRight:"4px",
          paddingBottom:"4px", display:"inline"}}>
            {message.text}
          </p>
        </div>
      }

    /*renderMessage = (message) => {
          return <div key={message.index+"b"} style={{overflow:"auto", marginTop:"-16px", marginBottom:"-26px"}}>
              <p style={{backgroundColor:"#e0e0e0", float:"left", borderRadius:"20px",
                paddingLeft:"4px", paddingRight:"4px", paddingBottom:"4px"}}>
                {message.text}
              </p>
            </div>
      }*/

  render() {


    let messagesDB = [{sender:"placeholder", timestamp: Number(Date.now()),
      messages: [{text:"loading messages from database...", timestamp:Number(Date.now())}] }];

    if(this.props.messages.length > 0){messagesDB = this.props.messages; console.log(messagesDB[0].messages[0].text)};


    return (
      <div>
      <MessagesDrawer/>

      <div style={{maxWidth: "800px", marginLeft:"240px", marginTop:"-112px", padding:"4px", height:"100vh", backgroundColor:"white"}}>
      {messagesDB[0].messages.map((message, index) =>
        <div>
          {this.sendMessage(message)}
        </div>,
      )}
      {this.state.messages.map((message, index) =>
        <div>
        {this.sendMessage(message)}
        </div>,
      )}
      </div>

        <ChatInput
          ws={this.ws}
          onSubmitMessage={(e) => this.testFunction(e)}
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
