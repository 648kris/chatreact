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
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
      <form className={classes.container} noValidate autoComplete="off">
      <div style={{width:"650px", marginRight:"20px"}}>
        <TextField
          required
          fullWidth
          multiline
          rows="4"
          id="input"
          label="type a message"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange("input")}
          margin="normal"
          variant="outlined"
          />
      </div>
      </form>
      <SendButton />
      </div>
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);
