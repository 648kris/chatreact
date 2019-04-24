import React, { Component } from 'react';
import ChatInput from './ChatInput';
import Avatar from '@material-ui/core/Avatar';
import MessagesDrawer from '../MessagesDrawer/MessagesDrawer';
import { connect } from 'react-redux';
import * as actions from '../actions';

const URL = 'ws://localhost:3030'

class Chat extends Component {

  state = {
    recipient: "Jacob",
    messages: []
  }
  //conversation values in the state will come from conversation selected in the sidebar
  //the hardcoded conversation value in state is a temporary placeholders

  ws = new WebSocket(URL)

  componentDidMount() {

    this.props.fetchUser();
    this.props.fetchMessages(this.props.recipient);

    if(this.props.messages.length > 0){
       this.setState({m: this.props.messages})
    }

    this.ws.onopen = () => {
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
    }
  }

  newMessage = (e) => {
    console.log("NEW MESSAGES POSTED FROM REACT CHAT.JS")
    console.log(this.props);
    let messages = this.state.messages;
    let newMessage = {sender: this.props.auth.username, timestamp: Number(Date.now()), text: e};
    messages.push(newMessage);
    this.setState({messages: messages});
    this.props.postMessage(e, this.props.recipient);
    //for added security, I am sending a few values to the api and rebuilding the new message on the backend
    //that keeps users from potentially creating fake conversations
  }

  sendMessage = (message) => {
        if(this.props){
          if(this.props.auth){
            if(this.props.auth.username){
              if (message.sender===this.props.auth.username){
                return <div key={message.index+"a"} style={{overflow:"auto", marginTop:"-16px", marginBottom:"-26px"}}>
                  <p style={{backgroundColor:"#e0e0e0", float:"left", borderRadius:"20px",
                    paddingLeft:"4px", paddingRight:"4px", paddingBottom:"4px"}}>
                    {message.text}
                  </p>
                </div>
              }
            }
          }
        } //prop checks to avoid "cant read x of undefined" error
        return <div key={message.index+"b"} style={{ display:"block", textAlign:"right", padding:"6px"}}>
          <p style={{backgroundColor:"#3f51b5", color:"white", borderRadius:"20px", paddingLeft:"4px", paddingRight:"4px",
          paddingBottom:"4px", display:"inline"}}>
            {message.text}
          </p>
        </div>
      }

  render() {

    //let messagesDB = [{sender:"placeholder", timestamp: Number(Date.now()),
      //messages: [{text:"loading messages from database...", timestamp:Number(Date.now())}] }];
      console.log("000000000000000000this.props.recipient = ")
      console.log(this.props.recipient)
      let r = ""
      if(typeof this.props.recipient == "string"){r = this.props.recipient}

    let messagesDB = []


    if(this.props.messages){
      if(this.props.messages.messages){
        messagesDB = this.props.messages.messages;
        console.log("messagesDB = ")
        console.log(messagesDB)
      }
    }//prop checks to avoid "cant read x of undefined" error



    return (
      <div>
      <MessagesDrawer/>

      <div style={{maxWidth: "800px", marginLeft:"240px", marginTop:"-112px", padding:"4px", height:"100vh", backgroundColor:"white"}}>

      <h2 style={{width: "100%", margin:"auto", textAlign:"center",
      color:"white", backgroundColor: '#e91e63' }}>
        {r}
      </h2>

      <div style={{padding:"6px"}}/>

        {messagesDB.map((message, index) =>
          <div>
            {this.sendMessage(message)}
          </div>
          )}
        {this.state.messages.map((message, index) =>
          <div>
            {this.sendMessage(message)}
          </div>
          )}
      </div>

        <ChatInput
          ws={this.ws}
          onSubmitMessage={(e) => this.newMessage(e)}
        />

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    messages: state.messages,
    recipient: state.recipient
  };
}

export default connect(mapStateToProps, actions)(Chat);
