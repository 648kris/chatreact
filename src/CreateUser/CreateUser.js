import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import * as actions from '../actions';
import { connect } from 'react-redux';

const theme = {
  spacing: {unit: 8},

  palette: {
   primary: {
     // light: will be calculated from palette.primary.main,
     main: '#ff4400',
     // dark: will be calculated from palette.primary.main,
     // contrastText: will be calculated to contrast with palette.primary.main
   },
   secondary: {
     light: '#0066ff',
     main: '#0044ff',
     // dark: will be calculated from palette.secondary.main,
     contrastText: '#ffcc00',
   },
   // error: will use the default color
 },

}

const styles = {
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
  },
  paper: {
    maxWidth: '400px',
    margin: 'auto',
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
};

class SignIn extends Component{

  state = {
    username: "",
    password: ""
  }

  handleLogin = () => {
    let username = this.state.username;
    let password = this.state.password;
    this.props.loginUser(username, password)
  }

  handleSubmit = () => {
    console.log(this.state.username)
    console.log(this.state.password)

    let username = this.state.username;
    let password = this.state.password;
    this.props.createUser(username, password)
    setTimeout(this.handleLogin, 500)
  }

  handleUsernameChange = (e) => {
    console.log(e.target.value)
    this.setState({username: e.target.value})
  }

  handlePasswordChange = (e) => {
    console.log(e.target.value)
    this.setState({password: e.target.value})
  }

  render(){

  return (
    <main style={styles.main}>
      <CssBaseline />
      <Paper style={styles.paper}>
        <Avatar style={{color:'white', backgroundColor:"#e91e63"}}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create New Account
        </Typography>
        <form
          style={styles.form}
          action="."
          onSubmit={e => this.handleSubmit(e)}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="username">
                Username
              </InputLabel>
            <Input
            id="username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={ (e) => this.handleUsernameChange(e) } />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">
                Password
            </InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={ (e) => this.handlePasswordChange(e) }/>
          </FormControl>
          <Button
            onClick={() => this.handleSubmit()}
            fullWidth
            variant="contained"
            color="primary"
            style={styles.submit}
          >
            Create Account
          </Button>
        </form>
      </Paper>
    </main>
  );
}
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(null, actions)(SignIn);
