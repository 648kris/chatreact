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

let messages = [{name: 'Kristen', timestamp: Number(Date.now()), text: 'message preview', id:'rj39423iuf389234urh'},
  {name: 'Jacob', timestamp: Number(Date.now()), text: 'message preview', id:'93940infiu32932'},
  {name: 'Kayla', timestamp: Number(Date.now()), text: 'message preview', id:'32j8394qru329ha93ru'}];

console.log((new Date(messages[0].timestamp)).toDateString())

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleNameClick = (m) => {
    this.props.selectUser(m.name);
    this.props.fetchMessages(m.name);
  };

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <List>
          {messages.map((message, index) => (
            <ListItem button key={index} onClick={() => this.handleNameClick(message)}>
              <Avatar> <LetterAvatar letter={message.name[0]} color="#e91e63"/> </Avatar>
              <ListItemText primary={message.name} secondary={ (new Date(messages[0].timestamp)).toDateString()
                 + "      " + (new Date(messages[0].timestamp)).toLocaleTimeString().substring(0, 5) + (new Date(messages[0].timestamp)).toLocaleTimeString().substring(8)} />
            </ListItem>
          ))}
        </List>
        <Divider />

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

export default connect(null, actions)(DrawerWithStyles);
