import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import LetterAvatar from '../Avatars/LetterAvatar';
//import StartConvo from './StartConvo';


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import * as actions from '../actions';
import { connect } from 'react-redux';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});


class ResponsiveDrawer extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchConversations()
  }

  componentDidUpdate(prevProps) {
    if (this.props.conversations !== prevProps.conversations ) {
      if(this.props.conversations[0]){
        this.setState({conversationsDB: this.props.conversations})
      }
    }
    if (!this.props.auth.username) { window.location.href="/"}
  }

  state = {
    open: false,
    username: "",
    text: "",//end dialog box state
    mobileOpen: false,
    conversationsDB: [{
      users: ["", ""],
      messages: [{sender: "", recipient: "", timestamp: 1556290536688, text: ""}],
      timestamp: ""
      }],
    conversations: [],
    selectUser: "",
};

handleClickOpen = () => {
  this.setState({ open: true });
};

handleClose = () => {
  this.setState({ open: false });
};

handleSubmit = () => {
  let text = this.state.text;
  let recipient = this.state.username;
  let currentUser = this.props.auth.username;

  let newConversation = {"users":[currentUser, recipient],
  "timestamp": Number(Date.now()),
  "messages":[{"sender":currentUser,"recipient":recipient,"timestamp":Number(Date.now()),"text":text}]
}
  let c = this.state.conversations;
  let newC = c.unshift(newConversation);
  this.setState({ conversations: c });
  this.setState({ open: false });
  this.props.postMessage(text, recipient)
};

handleUsernameChange = e => {
  this.setState({ username: e.target.value })
}

handleTextChange = e => {
  this.setState({ text: e.target.value })
}//end dialog box functions

  getOtherUser = (usersArr) => {
    let i = 0;
    if(usersArr[0] === this.props.auth.username){i = 1};
    return usersArr[i]
  }

  getAvatarColor = (usersArr) => {
    //let i = 0;
    //if(usersArr[0] === this.props.auth.username){i = 1};
    if(usersArr[0] === ""){return "white"}
    return "#e91e63"
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleNameClick = (m) => {
    let otherUser = this.getOtherUser(m.users);
    this.setState({selectUser: otherUser} )
    this.props.selectUser(otherUser);
    this.props.fetchMessages(otherUser);
  };

  getDateString = (ts) => {
    let dateString = new Date(ts).toDateString();
    if(dateString === 'Invalid Date'){
      return ""
    }
    else {return dateString}
  }

  getTimeString = (ts) => {
    let dateString = new Date(ts).toDateString();
    let timeString = new Date(ts).toLocaleTimeString().substring(0, 5);
    if(dateString === 'Invalid Date'){
      return ""
    }
    return timeString
  }

  getTimeStringCont = (ts) => {
    let dateString = new Date(ts).toDateString();
    let timeStringCont = new Date(ts).toLocaleTimeString().substring(8)
    if(dateString === 'Invalid Date'){
      return ""
    }
    return timeStringCont
  }



  render() {

    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <List>
          <ListItem button key={"new"}>
            <div style={{margin:"auto"}}>

            <div>
              <p style={{color:"#3f51b5"}} color="primary" onClick={this.handleClickOpen}>
                New Conversation
              </p>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">To:</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="recipient"
                    label="username"
                    fullWidth
                    onChange={e => this.handleUsernameChange(e)}
                  />
                  </DialogContent>

                  <DialogTitle id="form-dialog-title">Message:</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="messageText"
                      label="message"
                      fullWidth
                      onChange={e => this.handleTextChange(e)}
                    />
                </DialogContent>

                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.handleSubmit} color="primary">
                    Send
                  </Button>
                </DialogActions>
              </Dialog>
            </div>

            </div>
          </ListItem>
          <Divider />

          {this.state.conversations.map((message, index) => (
            <ListItem button onClick={() => this.handleNameClick(message)}>
              <Avatar> <LetterAvatar letter={this.getOtherUser(message.users)[0]} color={this.getAvatarColor(message.users)}/> </Avatar>
              <ListItemText primary={this.getOtherUser(message.users)} secondary={ (new Date(message.timestamp)).toDateString()
                 + "      " + (new Date(message.timestamp)).toLocaleTimeString().substring(0, 5) + (new Date(message.timestamp)).toLocaleTimeString().substring(8)} />
            </ListItem>
          ))}

          {this.state.conversationsDB.map((message, index) => (
            <ListItem button onClick={() => this.handleNameClick(message)}>
              <Avatar> <LetterAvatar letter={this.getOtherUser(message.users)[0]} color={this.getAvatarColor(message.users)}/> </Avatar>
              <ListItemText primary={this.getOtherUser(message.users)} secondary={ this.getDateString(message.timestamp)
                 + "      " + this.getTimeString(message.timestamp) + this.getTimeStringCont(message.timestamp)} />
            </ListItem>
          ))}

        </List>

      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />

        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />

        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

let DrawerWithStyles = withStyles(styles, { withTheme: true })(ResponsiveDrawer);

function mapStateToProps(state) {
  return {
    auth: state.auth,
    messages: state.messages,
    recipient: state.recipient,
    conversations: state.conversations,
  };
}

export default connect(mapStateToProps, actions)(DrawerWithStyles);
