import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import SendButton from './SendButton.js'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});


class OutlinedTextFields extends React.Component {
  state = {
    input: '',
  };

  handleChange = name => event => {
    if(event.target.keyCode === 13){
      this.setState({
        [name]: '</br>',
      });
    }
    this.setState({
      [name]: "event.target.value",
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div style={{bottom:"0px", position:"fixed", width: "800px", left:"240px", backgroundColor:"white"}}>
      <div style={{width:"100%"}}>
      <form
        className={classes.container} noValidate autoComplete="off">
        <TextField
          required
          fullWidth
          multiline
          rows="1"
          id="input"
          label="type a message"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange("input")}
          margin="normal"
          variant="outlined"
          />
      </form>
      <SendButton />
      </div>
      </div>
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);
