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
import StartConvo from './StartConvo'
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


class ResponsiveDrawer extends React.Component {
  componentDidMount() {
    console.log("NEW RENDER")
    this.props.fetchUser();
    this.props.fetchConversations()
  }

  componentDidUpdate(prevProps) {
    if (this.props.conversations !== prevProps.conversations ) {
      if(this.props.conversations[0]){
        this.forceUpdate();

        console.log(this.props.conversations)
        this.setState({key:"valueeee"})
      }
      //this.setState({conversations: this.props.conversations})
    }
  }

  state = {
    key:"value",
    mobileOpen: false,
    conversations: [{"users":["Jacob","Kristen"],
    "timestamp":1556037917300,
    "messages":[{"sender":"Jacob","recipient":"Kristen","timestamp":1555983369726,"text":"test"}]
 }]
};

  static getDerivedStateFromProps(props, state) {
    console.log("running detderivedstatefromprops")
    if(props.conversations[0]){
      if(props.conversations.length !== state.conversations.length){
        return {conversations: props.conversations}
      }
      console.log("AHHHHH")
      }
    }




  getOtherUser = (usersArr) => {
    let i = 0;
    if(usersArr[0] == this.props.auth.username){i = 1};
    return usersArr[i]
    //return "fuck"
  }


  /*  [{name: 'Kristen', timestamp: Number(Date.now()), text: 'message preview', id:'rj39423iuf389234urh'},
      {name: 'Jacob', timestamp: Number(Date.now()), text: 'message preview', id:'93940infiu32932'},
      {name: 'Kayla', timestamp: Number(Date.now()), text: 'message preview', id:'32j8394qru329ha93ru'}]*/


  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleNameClick = (m) => {
    this.props.selectUser(this.getOtherUser(m.users));
    this.props.fetchMessages(this.getOtherUser(m.users));
  };


  render() {
    let conversations = this.state.conversations;

    if(this.props.conversations !== this.state.conversations){
      if(this.props.conversations[0]){
        this.setState({conversations: this.props.conversations})
        conversations = this.props.conversations
        console.log("BUTTS")
      }
    }

    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <List>
          <ListItem button key={"new"}>
            <div style={{margin:"auto"}}><StartConvo/></div>
          </ListItem>
          <Divider />

          {conversations.map((message, index) => (
            <ListItem button onClick={() => this.handleNameClick(message)}>
              <Avatar> <LetterAvatar letter={this.getOtherUser(message.users)[0]} color="#e91e63"/> </Avatar>
              <ListItemText primary={this.getOtherUser(message.users)} secondary={ (new Date(message.timestamp)).toDateString()
                 + "      " + (new Date(message.timestamp)).toLocaleTimeString().substring(0, 5) + (new Date(message.timestamp)).toLocaleTimeString().substring(8)} />
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

function mapStateToProps(state) {
  return {
    auth: state.auth,
    messages: state.messages,
    recipient: state.recipient,
    conversations: state.conversations,
  };
}

export default connect(mapStateToProps, actions)(DrawerWithStyles);
