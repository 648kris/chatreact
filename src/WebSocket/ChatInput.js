import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

class ChatInput extends Component {
  static propTypes = {
    onSubmitMessage: PropTypes.func.isRequired,
  }
  state = {
    message: ''
  }

  handleChange = e => {
    this.setState({ message: e.target.value })
  }

  render() {
    return (
      <div style={{backgroundColor:"white", width: "800px",marginLeft:"240px", bottom:"0", padding:"5px", position:"fixed"}}>
      <form
        action="."
        onSubmit={e => {
          e.preventDefault()
          this.props.onSubmitMessage(this.state.message)
          this.setState({ message: '' })
        }}
      >
        <TextField
          required
          fullWidth
          multiline
          rows="2"
          margin="normal"
          variant="outlined"
          type="text"
          placeholder={'type a message...'}
          value={this.state.message}
          onChange={e => this.handleChange(e)}
        />
        <Button variant="contained" color="primary" type="submit" value={'Send'} >
           Send
          <Icon style={{marginLeft:"5px"}}>send</Icon>
        </Button>
      </form>
      </div>
    )
  }
}

export default ChatInput
