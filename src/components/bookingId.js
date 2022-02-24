import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './OfferARide.css';
import './bookingId.css';
import './spinners.css';
import 'date-fns';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { bookingIdActions } from './../actions';
import moment from 'moment';
import { cancelBookedRideActions } from './../actions';
import PersistentDrawerLeft from './appbar';
const styles = theme => ({
  root: {
    maxWidth: 250,

  },
  slider: {
    padding: '10px 0px',
  },
  grown: {
    flexGrow: 120,
    marginTop: '14px',
    color: 'white',
    fontSize: '24px',
    fontWeight: '400',
  },

});

class BookingId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      bookingId: '',
      showMessage: false,
      theme: '',
      message: '',
      cancel_button: false
    }
    this.user = JSON.parse(localStorage.getItem('user'));
    this.BookingId = JSON.parse(localStorage.getItem('BookingId'));
  }

  cancelButton = (e, bookingIdData) => {
    e.preventDefault();
    this.props.sendCancelBookedRideRequest(bookingIdData);
  }

  logout = () => {
    localStorage.clear();
    window.location.href = '/';
  }

  goToBackScreen = (e) => {
    this.props.history.push('/home')
  }

  backButton = () => {
    this.props.history.push('/home');
  }
  feeback = () => {

    this.setState({
      showFeedback: true
    })
  }
  closePopUp = () => {
    this.setState({ showFeedback: false })
  }

  render() {
    const { classes } = this.props;
    const { fullScreen } = this.props;
    let bookingDetails = this.props.bookingIdData || this.BookingId;
    let shuttleName = bookingDetails.user.name || 'Shuttle';
    return (<div>
      <MuiThemeProvider>
        <React.Fragment>
          <PersistentDrawerLeft
            history={this.props.history} />
          <Grid container spacing={12}>
            {bookingDetails ?
              <form className='FormStyle' >
                <fieldset>
                  <legend>Booked Details</legend>
                  <div className={classes.column}>
                    <Typography className={classes.heading}><b>Your Starting Point</b> : {bookingDetails.startLocation}</Typography>
                  </div>
                  <br />
                  <div className={classes.column}>
                    <Typography className={classes.heading}><b>Your Ending Point</b> : {bookingDetails.endLocation}</Typography>
                  </div>
                  <br />
                  <div className={classes.column}>
                    <Typography className={classes.heading}><b>Host Starting Point</b> : {bookingDetails.ride.startLocation}</Typography>
                  </div>
                  <br />
                  <div className={classes.column}>
                    <Typography className={classes.heading}><b>Host Ending Point</b> : {bookingDetails.ride.endLocation}</Typography>
                  </div>
                  <br />
                  <div className={classes.column}>
                    <div className={classes.column}>
                      <Typography className={classes.heading}><b>Name</b> : {shuttleName}</Typography>
                    </div>
                    <br />
                    <div className={classes.column}>
                      <Typography className={classes.heading}><b>Email</b> : {bookingDetails.user.email}</Typography>
                    </div>
                    <br />
                    <div className={classes.column}>
                      <Typography className={classes.heading}><b>Mobile</b> : {bookingDetails.user.mobileNumber}</Typography>
                    </div>
                    <br />
                    <div className={classes.column}>
                      <Typography className={classes.heading}><b>Gender</b> : {bookingDetails.user.gender}</Typography>
                    </div>
                    <br />
                    <div className={classes.column}>
                      <Typography className={classes.heading}><b>Available Seats</b> : {bookingDetails.ride.availableSeats}</Typography>
                    </div>
                    <br />
                    <div className={classes.column}>
                      <Typography className={classes.heading}><b>Date</b> : {moment(bookingDetails.ride.departureDate, 'YYYY-MM-DD[T]HH:mm:ss:SSS').format('MMMM Do YYYY, h:mm a')}</Typography>
                    </div>
                    <br />
                    <Typography className={classes.heading}><b>You'll Pay</b> :₹ {bookingDetails.rideCharges}</Typography>
                  </div>
                  <br />
                  <div className={classes.column}>
                    <Typography className={classes.heading}><b>Status</b> : {bookingDetails.status}</Typography>
                  </div>
                  <br />
                  {this.props.showLoader ?
                    <div>
                      <span>
                        <img src="/assets/loading.svg" alt="loading" className="login-loading" />
                      </span>
                    </div> :
                    bookingDetails.status === 'PENDING' ?
                      <span>
                        <Button
                          type="button"
                          variant="contained"
                          color="secondary"
                          className="cancel-button"
                          onClick={(e) => this.cancelButton(e, bookingDetails)}>CANCEL
                </Button>
                      </span>
                      : ('')
                  }
                  <span>
                    <Button
                      variant="contained"
                      className="back-button-1"
                      onClick={this.backButton}>
                      BACK
                </Button>
                  </span>

                </fieldset>
              </form>
              :
              <div className="loader">
              </div>}
          </Grid>
        </React.Fragment>
      </MuiThemeProvider>
    </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    bookingIdData: state.bookingIdReducer.bookingIdData,
    showLoader: state.cancelBookedRideReducer.showLoader,
    errMsg: state.cancelBookedRideReducer.errMsg,
    successMsg: state.cancelBookedRideReducer.successMsg,
    isFetching: state.cancelBookedRideReducer.isFetching,
    cancelRide: state.cancelBookedRideReducer.cancelRide

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendBookingIdRequest: (bookinLoginDetails) => dispatch(bookingIdActions.sendBookingIdRequest(bookinLoginDetails)),
    fetchBookingIdSuccess: (bookingLoginData) => dispatch(bookingIdActions.fetchBookingIdSuccess(bookingLoginData)),
    sendCancelBookedRideRequest: (cancelling) => dispatch(cancelBookedRideActions.sendCancelBookedRideRequest(cancelling)),
    fetchCancelBookedRideSuccess: (cancelBookedRideDetails) => dispatch(cancelBookedRideActions.fetchCancelBookedRideSuccess(cancelBookedRideDetails)),
    fetchCancelBookedRideError: (cancelBookedRideErrMsg) => dispatch(cancelBookedRideActions.fetchCancelBookedRideError(cancelBookedRideErrMsg)),
    clearNotification: () => dispatch({ type: 'CLEAR_NOTIFICATIONS' })

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(BookingId)));  