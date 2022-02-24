import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import './OfferARide.css'
import Grid from '@material-ui/core/Grid';
import Validator from './validator';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { submitActions, messageActions, ldapSignupActions, loginAction } from '../actions';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PersistentDrawerLeft from './appbar';

export class LdapSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signupDetails: {
        email: '',
        firstName: '',
        lastName: '',
        gender: 'male',
        mobileNumber: '',
        name: '',
        userName: ''
      },
      showMessage: '',
      theme: '',
      message: '',
      checked: false,
    }
    this.validators = new Validator();
    this.isValid = false;
  }

  handleInputChange = (event, inputProps) => {
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
        this.setState({ isFormValid: false });
        // the above setState is for rendering the component
        break;
      }
      else {
        const signupDetails = { ...this.state.signupDetails };
        signupDetails[inputProps] = fieldVd.value;
        this.setState({
          signupDetails: signupDetails,
        });
      }
    }
  }

  signUp = (e) => {
    e.preventDefault();
    this.isFormValid();
    if (this.isValid) {
      let userConfig = {
        'email': this.state.signupDetails.email,
        'firstName': this.state.signupDetails.firstName,
        'lastName': this.state.signupDetails.lastName,
        'gender': this.state.signupDetails.gender,
        'mobileNumber': this.state.signupDetails.mobileNumber,
        'name': this.state.signupDetails.firstName,
        'username': this.state.signupDetails.userName,
      };
      this.props.sendLdapSignupRequest(userConfig);
    } else {
      this.setState({ isFormValid: false });
      // the above setState is for rendering the component
    }
  }

  isFormValid() {
    let fieldNames;
    fieldNames = ['email', 'firstName', 'lastName', 'mobileNumber', 'userName',]
    this.isValid = true;
    this.isValid = this.validators.isFormValid(fieldNames);
    return this.isValid;
  }

  handleTermsAndCondition = (e) => {
    this.setState(prevState => ({
      showTerms: true
    }));
  }

  handleClose = (e) => {
    this.setState({
      showTerms: false,
      checked: false
    })
  }
  handleCheck = (e) => {
    this.setState({
      showTerms: false,
      checked: true
    })
  }

  componentDidMount() {
    if (localStorage.getItem("token") === null) {
      this.props.history.push('/');
    }
  }

  render() {
    const { fullScreen } = this.props;

    if (this.state.showMessage) {
      setTimeout(() => {
        this.setState({
          showMessage: false,
        })
      }, 3000);
    }

    if (this.props.ldapSuccessMsg) {
      if (this.props.ldapSignupData) {
        localStorage.setItem('user', JSON.stringify(this.props.ldapSignupData));
        this.props.history.push('/home');
      }
      this.props.clearLdapSignupNotifications();
    }

    if (this.props.ldapErrMsg) {
      this.setState({
        showMessage: true,
        theme: 'error',
        message: this.props.ldapErrMsg,
      });
      this.props.clearLdapSignupNotifications();
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
            {
              <form className='FormStyle' onSubmit={(event) => this.signUp(event)} >
                <fieldset className='FieldSet'><legend>Update Profile</legend>

                  <TextField
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    autoComplete="firstName"
                    onChange={(event) => { this.handleInputChange(event, 'firstName') }}
                    error={this.validators.firstName.errorMsg !== ''}
                  />
                  <div>{this.validators.firstName.errorMsg}</div>
                  <br />

                  <TextField
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    autoComplete="lastName"
                    onChange={(event) => { this.handleInputChange(event, 'lastName') }}
                    error={this.validators.lastName.errorMsg !== ''}
                  />
                  <div>{this.validators.lastName.errorMsg}</div>
                  <br />

                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    autoComplete="email"
                    onChange={(event) => { this.handleInputChange(event, 'email') }}
                    error={this.validators.email.errorMsg !== ''}
                  />
                  <div>{this.validators.email.errorMsg}</div>
                  <br />

                  <TextField
                    id="userName"
                    name="userName"
                    label="User Name"
                    autoComplete="userName"
                    onChange={(event) => { this.handleInputChange(event, 'userName') }}
                    error={this.validators.userName.errorMsg !== ''}
                  />
                  <div>{this.validators.userName.errorMsg}</div>
                  <br />

                  <TextField
                    id="mobileNumber"
                    name="mobileNumber"
                    label="Mobile Number"
                    autoComplete="mobileNumber"
                    onChange={(event) => { this.handleInputChange(event, 'mobileNumber') }}
                    error={this.validators.mobileNumber.errorMsg !== ''}
                  />
                  <div>{this.validators.mobileNumber.errorMsg}</div>
                  <br />
                  <FormControl>
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                      aria-label="Gender"
                      name="gender"
                      value={this.state.signupDetails.gender}
                      onChange={(event) => { this.handleInputChange(event, 'gender') }}
                    >
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox
                        onChange={(e) => this.handleTermsAndCondition(e)}
                        checked={this.state.checked ? true : false}
                      />}
                      label=" I have read and agree to the Terms and Conditions and Privacy Policy"
                    />
                  </FormGroup>

                  {this.props.isLdapFetching ?
                    <span>
                      <img src="/assets/loading.svg" alt="loading" className="login-loading" />
                    </span>
                    :
                    <section className="login-button">
                      <Button type='submit'
                        variant="contained" color="primary" disabled={this.state.checked ? false : true}>
                        Register
											</Button>
                    </section>
                  }

                </fieldset>

              </form>}
          </Grid>
          <Dialog
            fullScreen={fullScreen}
            open={this.state.showTerms}
            onClose={this.handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">{<h2>Terms and Conditions</h2>}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus vestibulum feugiat. Vestibulum vel ipsum eget erat sagittis sagittis eu dapibus lorem. Donec tincidunt porta dictum. Vestibulum vel lacinia massa, eget euismod justo. Curabitur dolor diam, mollis quis lacinia ut, auctor nec felis. Morbi a est ornare, egestas sapien sit amet, volutpat dui. Cras elit ex, tempor ut felis in, porta volutpat mi. Aenean vel ante ac ligula placerat ultrices id vitae ex. Duis et scelerisque elit, a rhoncus erat. Sed purus velit, venenatis vel dolor sit amet, elementum elementum urna. Ut dapibus dolor nec ex ullamcorper ultricies. Fusce felis augue, maximus sed tempor sed, condimentum at leo.

                Pellentesque ac scelerisque metus. Nulla at eleifend ligula. Donec aliquet hendrerit mi ac venenatis. Integer ornare eros vel pulvinar accumsan. Sed eu orci dolor. In eget tellus sit amet risus egestas consectetur eu vel augue. Cras efficitur lorem quis orci semper, at ultrices turpis congue. Phasellus nisl est, ullamcorper vitae convallis a, venenatis id eros. Morbi ac nulla efficitur est porttitor imperdiet vitae nec massa. Curabitur tempus elementum iaculis. Suspendisse eu urna molestie, semper mauris nec, tempus nibh. Nulla et congue est. Donec dictum egestas nibh, consectetur tincidunt ex. Donec suscipit nulla viverra metus semper, a suscipit libero sagittis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras id turpis ac enim mollis luctus.

                Morbi vel rhoncus odio. Nam laoreet enim risus, commodo elementum risus faucibus in. Suspendisse magna ante, mattis eu nisi nec, rhoncus auctor enim. Curabitur velit erat, posuere eu libero ac, cursus placerat elit. Morbi finibus varius turpis, sit amet efficitur urna mollis non. Etiam euismod neque et consectetur finibus. In in metus lacus. Quisque non lorem nec dolor convallis feugiat sed laoreet urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

                Donec aliquet nibh vel mattis venenatis. Proin sed elit id arcu convallis rutrum. Aenean sit amet massa viverra, viverra nunc nec, semper neque. Aenean mollis ultrices aliquam. Nulla massa dui, eleifend vitae odio sit amet, faucibus lacinia lorem. Fusce non malesuada ex, non suscipit ante. Praesent ornare auctor sodales. Donec mi tellus, tempus id pharetra vitae, posuere at orci. Nulla facilisi. Donec vitae mollis ante. Mauris scelerisque sapien nisi, quis feugiat purus tempus id. Fusce ultricies sem eu purus auctor imperdiet. Donec aliquet id mauris ac tempor. Nam aliquam leo lacus, interdum gravida augue vestibulum ut. In consequat suscipit neque vitae malesuada. Fusce fermentum enim fermentum lectus condimentum sollicitudin.

                Pellentesque quis dignissim dolor. Sed lectus nunc, tempor finibus ullamcorper non, eleifend eu mauris. Fusce a interdum turpis. Nullam consequat metus vel purus mollis condimentum. Nullam finibus faucibus fringilla. Pellentesque ut lorem ac tortor euismod facilisis. Nulla eu mollis lectus. Sed finibus fringilla magna sit amet rhoncus.

                In accumsan arcu vitae ligula congue, ut ultricies elit condimentum. Sed consectetur, sapien nec sollicitudin euismod, justo eros consequat sapien, in sodales orci nisi et sapien. Nulla sed faucibus eros, in rhoncus purus. Sed nulla nisl, suscipit non ornare non, imperdiet a nibh. Duis arcu felis, lacinia vitae auctor non, tempus at diam. Nunc posuere sem sed viverra lacinia. Nam tempus lacus lectus, sit amet accumsan neque ornare sed. Donec venenatis dolor a orci interdum, sit amet scelerisque dolor porttitor.

                Nam molestie iaculis aliquam. Curabitur commodo auctor nisl ut mollis. In at imperdiet mauris, vitae laoreet neque. Integer dignissim eu massa sit amet ornare. Pellentesque eget lobortis ex. Maecenas imperdiet nisl ac tellus pellentesque viverra. Phasellus posuere ullamcorper tincidunt. Curabitur id felis nec risus commodo gravida. Integer vestibulum quis sapien ut tincidunt. Nullam velit enim, tristique eget sollicitudin ut, aliquet eget libero. Cras vehicula est ac risus hendrerit, id commodo magna dapibus.

                Suspendisse euismod lectus facilisis tincidunt convallis. Nulla vehicula dui eu egestas maximus. Cras tincidunt tincidunt tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer vitae rhoncus neque, ut molestie leo. In cursus ipsum ut accumsan lobortis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent scelerisque vestibulum nunc ac vestibulum. Aliquam quis egestas quam, scelerisque suscipit orci. Ut viverra ex vel nisi egestas condimentum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

                In sed eleifend velit. Integer lobortis sapien in nibh mollis imperdiet. Donec semper neque a tellus elementum, eu consectetur massa tempor. Aliquam nec leo vitae leo pulvinar sollicitudin sed eget risus. Mauris facilisis interdum sagittis. Donec condimentum velit id lacinia facilisis. Donec quis efficitur felis, at sodales ex. Vivamus ut gravida nunc. Maecenas euismod ut tellus in dignissim. Nunc vel accumsan nisi, vestibulum vulputate felis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque et arcu orci. Integer malesuada tellus diam, vel dictum nisi pharetra eu. Pellentesque et volutpat risus, id convallis tellus.

                Vestibulum et lacus pulvinar, efficitur sapien nec, elementum mi. In non neque blandit elit porta hendrerit. Sed tristique, mi eu gravida consectetur, lorem massa faucibus mauris, nec facilisis augue eros sed justo. Aenean at leo sed nisl commodo tincidunt. Donec et enim turpis. Aliquam erat volutpat. Suspendisse eu sagittis felis, at suscipit nisl. Integer nec facilisis dolor. Vivamus dictum condimentum dolor, nec fermentum metus venenatis eget. Nam vulputate erat elementum condimentum vulputate. Etiam vestibulum ex quis eleifend bibendum. Maecenas feugiat mi ut neque tempor, ut pharetra magna imperdiet.

                Suspendisse efficitur vestibulum hendrerit. Sed vel dignissim tortor, eu facilisis arcu. Cras porta mauris et diam vulputate, id elementum nulla rutrum. Nullam gravida scelerisque turpis quis consectetur. Cras ut facilisis nisi. Suspendisse sed ipsum arcu. Donec ultrices lacus vitae nulla elementum, a efficitur risus aliquet. Cras posuere sapien sed quam pharetra consectetur. In hac habitasse platea dictumst. Sed sit amet nisi at libero sagittis luctus. Fusce a quam et purus vestibulum feugiat. Suspendisse eget tincidunt nulla, convallis viverra velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse et augue consequat, ornare dolor nec, sodales leo. Vestibulum lobortis sed mi eleifend placerat.

                Quisque posuere iaculis neque, nec eleifend magna faucibus vitae. In pulvinar gravida risus sit amet elementum. Suspendisse id nibh euismod, accumsan orci sed, aliquet massa. Pellentesque imperdiet rhoncus elit. Sed bibendum felis non posuere commodo. Cras auctor sodales massa et fermentum. Sed in scelerisque turpis. Nulla pulvinar dictum lacinia. Maecenas porttitor elit vitae metus posuere ultricies.

                Donec efficitur urna sit amet arcu laoreet, in tempus risus congue. Phasellus viverra venenatis mauris, vitae interdum dui accumsan non. Integer ac tempus metus, cursus tempor nunc. Donec nec lectus efficitur, interdum quam vel, pharetra ante. Cras blandit elementum mauris id varius. Proin pretium erat quis suscipit laoreet. Donec eleifend leo tellus, sit amet molestie velit molestie at. Aenean ultricies ex ipsum, fermentum sagittis nunc faucibus non. Morbi urna quam, malesuada et auctor et, mattis ut dolor. Aenean libero sapien, laoreet nec tempus ut, viverra vel felis. Donec laoreet faucibus nisl, nec egestas tellus faucibus porta. In pharetra, lectus sed interdum maximus, justo erat dictum leo, quis lobortis nibh eros vel nisl. Aliquam faucibus efficitur justo, ac dignissim libero. Curabitur maximus ornare mollis.

                Nulla viverra justo eget erat sollicitudin, vel scelerisque ipsum porttitor. Aliquam quis convallis purus, sed pellentesque ex. Etiam scelerisque vestibulum nibh. Aliquam auctor nibh at massa posuere, non egestas ante finibus. Duis nec lectus lorem. Curabitur sit amet ipsum pellentesque, congue eros in, semper nulla. Ut bibendum sollicitudin quam. Duis id quam fermentum, molestie turpis fermentum, porttitor mauris.

                Ut tristique lectus quis ornare mattis. Fusce ut risus facilisis, commodo ligula quis, porta est. Phasellus in elit felis. Nulla a enim eleifend, rhoncus nibh et, auctor mauris. Quisque vitae cursus mi. Proin mauris arcu, blandit eget eros quis, mattis egestas lorem. Etiam lacinia quis tellus ullamcorper finibus. Curabitur vehicula nisl ac lectus suscipit, vel dignissim felis consectetur. Nam blandit purus eget arcu fringilla, a iaculis sapien elementum. Donec est orci, semper a elementum ut, egestas nec metus. Aenean hendrerit metus eget ultrices facilisis. Aliquam maximus tincidunt condimentum. Nulla vehicula pharetra justo, quis lacinia lectus. Sed consectetur feugiat nibh, non commodo augue semper sed. Etiam pellentesque ante quis orci aliquam vulputate. Morbi erat libero, ultricies vitae enim a, porta auctor augue.
          </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={(e) => this.handleClose(e)} color="primary">
                Disagree
          </Button>
              <Button onClick={(e) => this.handleCheck(e)} color="primary" autoFocus>
                Agree
          </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      </MuiThemeProvider>

    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    ldapSignupData: state.ldapSignupReducer.ldapSignupData,
    isLdapFetching: state.ldapSignupReducer.isLdapFetching,
    ldapSuccessMsg: state.ldapSignupReducer.ldapSuccessMsg,
    ldapErrMsg: state.ldapSignupReducer.ldapErrMsg,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendLdapSignupRequest: (ldapSignupDetails) => dispatch(ldapSignupActions.sendLdapSignupRequest(ldapSignupDetails)),
    clearLdapSignupNotifications: () => dispatch({ type: 'CLEAR_LDAP_SIGNUP_NOTIFICATIONS' }),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LdapSignup));