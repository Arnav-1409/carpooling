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
import { yourOfferedRidesActions } from '../actions';

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
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  heading: {
    textAlign: 'center',
  },
  column: {
    flexBasis: '60%',
    padding: '1%',
  },
  actionButtons: {
    marginRight: 15,
  }
};

export class YourOfferedRides extends Component {
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

  deleteButton = (e, details, index) => {
    e.preventDefault();
    console.log('hi, index', index);
  }


  componentDidMount() {
    this.props.fetchYourOfferedRidesData(this.emailId.email);
  }


  render() {

    let { classes, yourOfferedRidesData, yourOfferedRidesError, yourOfferedRidesSuccess, yourOfferedRidesFetching } = this.props;
    yourOfferedRidesData = yourOfferedRidesData || [];
    console.log('rides', yourOfferedRidesData);

    if (this.state.showMessage) {
      setTimeout(() => {
        this.setState({
          showMessage: false,
        })
      }, 4000);
    }

    // if (successMsg) {
    //   this.setState({
    //     showMessage: true,
    //     theme: 'success',
    //     message: 'Your ride is cancelled!',
    //   })
    //   this.props.clearCancelNotifications();
    // }

    // if (errMsg) {
    //   this.setState({
    //     showMessage: true,
    //     theme: 'success',
    //     message: errMsg,
    //   })
    //   this.props.clearYourBookingsNotification();
    //   this.props.clearCancelNotifications();
    // }

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
            <h1 className={classes.heading}>Your Offered Rides</h1>
            {yourOfferedRidesFetching ?
              <div id="loader"></div> :
              (yourOfferedRidesData && yourOfferedRidesData.length) ?
                yourOfferedRidesData.map((details, index) => {
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
                          <b>Vehicle:</b> {details.vehicle}
                        </Typography>
                        <br></br>
                        <Typography component="p">
                          <b>Leaving On:</b> {moment(details.departureDate, 'YYYY-MM-DD[T]HH:mm:ss:SSS').format('MMMM Do YYYY, h:mm a')}
                        </Typography>
                        <br></br>
                        <Typography component="p">
                          <b>Available Seats:</b> {details.availableSeats}
                        </Typography>
                        <br></br>
                        <Typography component="p">
                          <b>You'll get:</b> ₹  {details.charges}
                        </Typography>
                        <br></br>
                        {this.props.showLoader ?
                          <div>
                            <span>
                              <img src="/assets/loading.svg" alt="loading" className="login-loading" />
                            </span>
                          </div> :
                          details.availableSeats !== 0 ?
                            <div className={classes.column}>
                              <span>
                                <Button
                                  className={classes.actionButtons}
                                  type="button"
                                  size="small"
                                  color="secondary"
                                  variant="contained"
                                  onClick={(e) => this.deleteButton(e, details, index)}
                                >Delete Ride
                                </Button>
                              </span>
                            </div>
                            : ('')
                        }
                      </CardContent>
                    </Card>
                  )
                })
                :
                <div className="no-rides">
                  <h3>You Haven't Offered Any Ride!</h3>
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
    yourOfferedRidesData: state.yourOfferedRidesReducer.yourOfferedRidesData,
    yourOfferedRidesError: state.yourOfferedRidesReducer.yourOfferedRidesError,
    yourOfferedRidesFetching: state.yourOfferedRidesReducer.yourOfferedRidesFetching,
    yourOfferedRidesSuccess: state.yourOfferedRidesReducer.yourOfferedRidesSuccess,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchYourOfferedRidesData: (emailId) => dispatch(yourOfferedRidesActions.fetchYourOfferedRidesData(emailId)),
    clearYourOfferedRidesNotification: () => dispatch(yourOfferedRidesActions.clearYourOfferedRidesNotification()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(YourOfferedRides));