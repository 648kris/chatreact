import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import TextInput from './TextInput';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: "700px",
    float: "top",

  },
  chip: {
    margin: theme.spacing.unit,
  },
});

function Chips(props) {

  const { classes } = props;
  return (
    <div style={{height:"90vh", borderRadius:"10px", backgroundColor:"white",
    width:"700px", margin:"auto", marginTop:"5vh",}} className="boxShadow">
    <div className={classes.root}>

      <div style={{width:"100%"}}>
      <div style={{float:"left"}}>
      <Chip
        avatar={<Avatar>K</Avatar>}
        label="this is a message from another user"
        className={classes.chip}
        color="primary"
      />
      </div>
      </div>

      <div style={{width:"100%"}}>
      <div style={{float:"right"}}>
      <Chip
        label="this is a message sent by the current user"
        className={classes.chip}
        color="secondary"
      />
      </div>
      </div>

      <div style={{position:"fixed", bottom:"5vh"}}>
    <TextInput />
    </div>

    </div>
    </div>
  );
}

Chips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chips);
