import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as actions from '../actions';
import { connect } from 'react-redux';


class FormDialog extends React.Component {

  constructor(props) {
     super(props);
     this.state = {
       open: false,
       username: "",
       text: ""
     }
   }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    let text = this.state.text;
    let recipient = this.state.username;
    this.setState({ open: false });
    this.props.postMessage(text, recipient)
  };

  handleUsernameChange = e => {
    this.setState({ username: e.target.value })
  }

  handleTextChange = e => {
    this.setState({ text: e.target.value })
  }

  render() {
    
    return (
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
    );
  }
}

export default connect(null, actions)(FormDialog)
