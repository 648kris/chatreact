import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '300px',
    maxWidth: 360,
    height: "100vh",
    backgroundColor: theme.palette.background.paper,
    display:"inline-block",
    float:"left",
  },
  avatar: {
    color: '#fff',
    backgroundColor: "#ff219e",
},
});

function InsetDividers(props) {
  const { classes } = props;
  return (
    <div>
    <List className={classes.root}>
      <ListItem>
        <Avatar className={classes.avatar}>
          K
        </Avatar>
        <ListItemText primary="Kris" secondary={
          <React.Fragment>
            <Typography component="span" className={classes.inline} color="textPrimary">
              Jan 21 8:39pm
            </Typography>
            {" — message preview…"}
          </React.Fragment>
            }
         />
      </ListItem>
      <li>
        <Divider variant="inset" />
      </li>
    </List>
    </div>
  );
}

InsetDividers.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(InsetDividers);
