import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './OfferARide.css'
import Grid from '@material-ui/core/Grid';
import Validator from './validator';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Notifications from './Notifications';
import { submitActions, messageActions, ldapLoginActions, loginAction, ldapEnabledActions } from './../actions';
import Snackbar from '@material-ui/core/Snackbar';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PersistentDrawerLeft from './appbar';

export class LdapLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginForm: {
        userName: '',
        password: '',
      },
      showMessage: false,
      theme: '',
      message: '',
      showPassword: false,
    }
    this.validators = new Validator();
    this.isValid = false;
  }

  handleLogin = (event, inputProps) => {
    const fieldVd = this.validators[inputProps];
    fieldVd.errorMsg = '';
    fieldVd.state = event.target.value;
    fieldVd.valid = true;
    fieldVd.value = event.target.value;
    fieldVd.touched = true;
    const rules = fieldVd.rules;
    for (let i = 0; i < rules.length; i++) {
      if (!rules[i].test(event.target.value)) {
        fieldVd.errorMsg = rules[i].message;
        fieldVd.valid = false;
        this.isValid = false;
        break;
      }
      else {
        const loginData = { ...this.state.loginForm };
        loginData[inputProps] = fieldVd.value;
        this.setState({
          loginForm: loginData
        });
      }
    }
  }

  logIn = (e) => {
    e.preventDefault();
    this.isLoginValid();
    if (this.isValid) {
      let userLogin = {
        "username": this.state.loginForm.userName,
        "password": this.state.loginForm.password,
      };
      this.props.sendLdapLoginRequest(userLogin);
    }
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  isLoginValid() {
    let fieldNames;
    fieldNames = ['userName', 'password',];
    this.isValid = true;
    this.isValid = this.validators.isFormValid(fieldNames);
    return this.isValid;
  }

  componentDidMount() {
    this.props.fetchLdapEnabledRequest();
  }

  render() {

    if (this.state.showMessage) {
      setTimeout(() => {
        this.setState({
          showMessage: false,
        })
      }, 6000);
    }

    if( this.props.isLdapEnabled === "false") {
      debugger
      this.props.history.push('/login')
      this.props.clearLdapEnabledNotifications();
    }

    if (this.props.ldapLoginSuccessMsg) {
      if (this.props.ldapLoginData) {
        localStorage.setItem('token', JSON.stringify(this.props.ldapLoginData));
        let userLogin = {
          "username": this.state.loginForm.userName,
        };
        this.props.sendLoginRequest(userLogin);
      }
      this.props.clearLdapLoginNotifications();
    }

    if (this.props.successMsg) {
      if (this.props.loginData && this.props.loginData.length) {
        localStorage.setItem('user', JSON.stringify(this.props.loginData[0]));
        this.props.history.push('/home');
      } else if (!this.props.loginData.length && this.props.userDoesNotExist) {
        this.setState({
          showMessage: true,
          theme: 'error',
          message: 'User does not exist!',
        });
        setTimeout(() => {
          this.props.history.push('./signup');
        }, 5000);
      }
      this.props.clearLoginSuccessNotifications();
    }

    if (this.props.ldapLoginErrMsg) {
      debugger
      this.setState({
        showMessage: true,
        theme: 'error',
        message: this.props.ldapLoginErrMsg,
      })
      this.props.clearLdapLoginNotifications();
    }

    if (this.props.errMsg) {
      this.setState({
        showMessage: true,
        theme: 'error',
        message: this.props.errMsg
      })
      this.props.clearLoginNotifications();
    }

    return (
      <MuiThemeProvider>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={this.state.showMessage}
          variant={this.state.theme}
          message={this.state.message}
        >
        </Snackbar>
        <React.Fragment>
          <PersistentDrawerLeft
            history={this.props.history} />

          <Grid container spacing={12}>
            <form className='FormStyle' onSubmit={(event) => this.logIn(event)}>
              <fieldset className='FieldSet'><legend>User Login</legend>
                <TextField
                  id="userName"
                  name="userName"
                  label="User Name"
                  autoComplete="userName"
                  onChange={(event) => { this.handleLogin(event, 'userName') }}
                  error={this.validators.userName.errorMsg !== ''}
                />
                <div>{this.validators.userName.errorMsg}</div>
                <br></br>
                <TextField
                  id="password"
                  name="password"
                  type={this.state.showPassword ? 'text' : 'password'}
                  label="Password"
                  autoComplete="password"
                  onChange={(event) => { this.handleLogin(event, 'password') }}
                  error={this.validators.password.errorMsg !== ''}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                        >
                          {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <div>{this.validators.password.errorMsg}</div>
                {this.props.isLdapLoginFetching ?
                  <span>
                    <img src="/assets/loading.svg" alt="loading" className="login-loading" />
                  </span>
                  :
                  <section className="login-button">
                    <Button type='submit'
                      variant="contained" color="primary" >
                      Login
										</Button>
                  </section>
                }
              </fieldset>
            </form>
          </Grid>
        </React.Fragment>
      </MuiThemeProvider>
    )
  }

}
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    isLdapLoginFetching: state.ldapLoginReducer.isLdapLoginFetching,
    ldapLoginSuccessMsg: state.ldapLoginReducer.ldapLoginSuccessMsg,
    ldapLoginErrMsg: state.ldapLoginReducer.ldapLoginErrMsg,
    ldapLoginData: state.ldapLoginReducer.ldapLoginData,
    loginData: state.loginReducer.loginData,
    isLoginFetching: state.loginReducer.isLoginFetching,
    userDoesNotExist: state.loginReducer.userDoesNotExist,
    successMsg: state.loginReducer.successMsg,
    errMsg: state.loginReducer.errMsg,
    isLdapEnabledFetching: state.ldapEnabledReducer.isLdapEnabledFetching,
    ldapEnabledSuccessMsg: state.ldapEnabledReducer.ldapEnabledSuccessMsg,
    isLdapEnabled: state.ldapEnabledReducer.isLdapEnabled,
    ldapEnabledErr: state.ldapEnabledReducer.ldapEnabledErr,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    sendLdapLoginRequest: (loginDetails) => dispatch(ldapLoginActions.sendLdapLoginRequest(loginDetails)),
    sendLoginRequest: (loginDetails) => dispatch(loginAction.sendLoginRequest(loginDetails)),
    clearLdapLoginNotifications: () => dispatch({ type: 'CLEAR_LDAP_LOGIN_NOTIFICATIONS' }),
    clearLoginNotifications: () => dispatch(loginAction.clearLoginNotifications()),
    clearLoginSuccessNotifications: () => dispatch(loginAction.clearLoginSuccessNotifications()),
    fetchLdapEnabledRequest: () => dispatch(ldapEnabledActions.fetchLdapEnabledRequest()),
    clearLdapEnabledNotifications: () => dispatch(ldapEnabledActions.clearLdapEnabledNotifications()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LdapLogin));
