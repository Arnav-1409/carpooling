import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import './RideDetailsDisplay.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import moment from 'moment';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux';
import PersistentDrawerLeft from './appbar';
import { yourBookingsActions, cancelBookedRideActions } from '../actions';

const styles = {
  card: {
    display: 'inline-flex',
    minWidth: 275,
    maxWidth: 500,
    marginLeft: 50,
    marginRight: 25,
    marginBottom: 50,
    background: 'aliceblue',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  heading: {
    textAlign: 'center',
  }
};

export class YourBookings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMessage: false,
      theme: '',
      message: '',
    }

    this.user = localStorage.getItem('user');
    this.emailId = JSON.parse(this.user)


  }

  cancelButton = (e, details, index) => {
    e.preventDefault();
    this.props.sendCancelBookedRideRequest(details);

  }


  componentDidMount() {
    this.props.fetchYourBookingsData(this.emailId.email);
  }


  render() {

    let { classes, yourBookingsData, successMsg, errMsg, yourBookingsFetching } = this.props;
    yourBookingsData = yourBookingsData || [];


    if (this.state.showMessage) {
      setTimeout(() => {
        this.setState({
          showMessage: false,
        })
      }, 4000);
    }

    if (successMsg) {
      this.setState({
        showMessage: true,
        theme: 'success',
        message: 'Your ride is cancelled!',
      })
      this.props.clearCancelNotifications();
      this.props.fetchYourBookingsData(this.emailId.email);
    }

    if (errMsg) {
      this.setState({
        showMessage: true,
        theme: 'success',
        message: errMsg,
      })
      this.props.clearYourBookingsNotification();
      this.props.clearCancelNotifications();
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
          <div className="root">
            <h1 className={classes.heading}>Your Bookings</h1>
            {yourBookingsFetching ?
              <div id="loader"></div> :
              (yourBookingsData && yourBookingsData.length) ?
                yourBookingsData.map((details, index) => {
                  let yourBookingsDataId = yourBookingsData.find((item, index) => item.bookingId === yourBookingsData[index].bookingId);
                  return (
                    <Card className={classes.card}>
                      <CardContent>
                        <Typography component="p">
                          <b>Start Point:</b> {details.startLocation}
                        </Typography>
                        <br></br>
                        <Typography component="p">
                          <b>End Point:</b> {details.endLocation}
                        </Typography>
                        <br></br>
                        <Typography component="p">
                          <b>Vehicle:</b> {details.ride.vehicle}
                        </Typography>
                        <br></br>
                        <Typography component="p">
                          <b>Leaving On:</b> {moment(details.ride.departureDate, 'YYYY-MM-DD[T]HH:mm:ss:SSS').format('MMMM Do YYYY, h:mm a')}
                        </Typography>
                        <br></br>
                        <Typography component="p">
                          <b>You'll Pay:</b> ₹  {details.rideCharges}
                        </Typography>
                        <br></br>
                        <Typography component="p">
                          <b>Status:</b> {details.status}
                        </Typography>
                        <br></br>
                        {this.props.showLoader ?
                          <div>
                            <span>
                              <img src="/assets/loading.svg" alt="loading" className="login-loading" />
                            </span>
                          </div> :
                          details.bookingId && details.status === 'PENDING' ?
                            <span>
                              <Button
                                type="button"
                                size="small"
                                color="secondary"
                                variant="contained"
                                onClick={(e) => this.cancelButton(e, details, index)}
                              >Cancel Ride
                        </Button>
                            </span>
                            : ('')
                        }
                      </CardContent>
                    </Card>
                  )
                })
                :
                <div className="no-rides">
                  <h3>You Haven't Booked Any Ride!</h3>
                </div>
            }
          </div>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    yourBookingsData: state.yourBookingsReducer.yourBookingsData,
    yourBookingsError: state.yourBookingsReducer.yourBookingsError,
    yourBookingsFetching: state.yourBookingsReducer.yourBookingsFetching,
    yourBookingsSuccess: state.yourBookingsReducer.yourBookingsSuccess,
    successMsg: state.cancelBookedRideReducer.successMsg,
    errMsg: state.cancelBookedRideReducer.errMsg,
    cancelRide: state.cancelBookedRideReducer.cancelRide,
    showLoader: state.cancelBookedRideReducer.showLoader,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchYourBookingsData: (emailId) => dispatch(yourBookingsActions.fetchYourBookingsData(emailId)),
    clearYourBookingsNotification: () => dispatch(yourBookingsActions.clearYourBookingsNotification()),
    sendCancelBookedRideRequest: (cancelling) => dispatch(cancelBookedRideActions.sendCancelBookedRideRequest(cancelling)),
    clearCancelNotifications: () => dispatch(cancelBookedRideActions.clearCancelNotifications()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(YourBookings));