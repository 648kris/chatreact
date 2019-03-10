import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import Grid from '@material-ui/core/Grid';

const styles = {
  avatar: {
    margin: 10,
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
};

function LetterAvatars(props) {
  return (
    <Grid container justify="center" alignItems="center">
        <Avatar style={{margin: 10, backgroundColor: props.color}}>
            {props.letter}
        </Avatar>
    </Grid>
  );
}


export default withStyles(styles)(LetterAvatars);
