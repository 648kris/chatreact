import React, { Component } from 'react';
import ChatInput from './ChatInput';
import Avatar from '@material-ui/core/Avatar';
import MessagesDrawer from '../MessagesDrawer/MessagesDrawer';
import { connect } from 'react-redux';
import * as actions from '../actions';


//const URL = 'ws://localhost:3030'

//the websocket was working before but it stopped working
//i tried going back to a previous version but it still didnt work
//im wondering if it could have to do with a dependency update
//i will fix the websocket to get the chat live again

class Chat extends Component {

  state = {
    conversation: {id: "5c9da033fb6fc0465d4e6e64", otherUser: "Kayla"},
    messages: []
  }
  //conversation values in the state will come from conversation selected in the sidebar
  //the hardcoded conversation value in state is a temporary placeholders

  //ws = new WebSocket(URL)

  componentDidMount() {

    console.log("CHAT.js didmount")
    console.log(this.props)
    this.props.fetchUser();
    this.props.fetchMessages('5c9da033fb6fc0465d4e6e64');
    //later I will make this hard coded conversation id dynamic
    //I will set conversation in the state using message selection in the sidebar

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

  newMessage = (e) => {
    console.log(this.props.messages.messages)
    console.log("input e = ");
    console.log(e);
    console.log(this.props.auth.username);
    let messages = this.state.messages;
    let newMessage = {sender: this.props.auth.username, timestamp: Number(Date.now()), text: e};
    messages.push(newMessage);
    console.log("messages = ");
    console.log(messages);
    this.setState({messages: messages});
    this.props.postMessage(e, this.state.conversation.otherUser, this.state.conversation.id);
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
        }
        return <div key={message.index+"b"} style={{ display:"block", textAlign:"right", padding:"6px"}}>
          <p style={{backgroundColor:"#3f51b5", color:"white", borderRadius:"20px", paddingLeft:"4px", paddingRight:"4px",
          paddingBottom:"4px", display:"inline"}}>
            {message.text}
          </p>
        </div>
      }

  render() {


    let messagesDB = [{sender:"placeholder", timestamp: Number(Date.now()),
      messages: [{text:"loading messages from database...", timestamp:Number(Date.now())}] }];

    if(this.props.messages){
      if(this.props.messages.messages){
        messagesDB = this.props.messages.messages;
      }
    }


    return (
      <div>
      <MessagesDrawer/>

      <div style={{maxWidth: "800px", marginLeft:"240px", marginTop:"-112px", padding:"4px", height:"100vh", backgroundColor:"white"}}>
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
  return { auth: state.auth,
    messages:state.messages };
}

export default connect(mapStateToProps, actions)(Chat);
