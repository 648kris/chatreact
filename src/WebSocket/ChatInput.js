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
    message: '',
  }

  render() {
    return (
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
          rows="1"
          margin="normal"
          variant="outlined"
          type="text"
          placeholder={'type a message...'}
          value={this.state.message}
          onChange={e => this.setState({ message: e.target.value })}
        />
        <Button variant="contained" color="primary" type="submit" value={'Send'} >
           Send
          <Icon style={{paddingLeft:"5px"}}>send</Icon>
        </Button>
      </form>
    )
  }
}

export default ChatInput
