import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './OfferARide.css';
import 'date-fns';
import TextField from '@material-ui/core/TextField';
import './OfferARide.css';
import './spinners.css';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Hidden } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';
import { acceptOffer, rejectOffer, deleteOffer, offerId } from './../actions';
import PersistentDrawerLeft from './appbar';

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  column: {
    flexBasis: '60%',
    padding: '1%',
  },
  panelSummary: {
    marginLeft: '19px',
    padding: '0px',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginLeft: 30,
    marginRight: 30,
  },
  date: {
    marginTop: '15px',
  },
  grown: {
    flexGrow: 120,
    marginTop: '14px',
    color: 'white',
    fontSize: '24px',
    fontWeight: '400',

  },
});
class OfferId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acceptSuccess: '',
      bookingId: '',
      rideRequestProcessingRow: 0
    }
    this.user = JSON.parse(localStorage.getItem('user'));
    this.offerId = JSON.parse(localStorage.getItem('OfferId'));
  }
  accept_Offer(event, acceptOfferData, index) {
    if (this.props.offerIdData.availableSeats > 0) {
      this.setState({
        rideRequestProcessingRow: index,
      })
      this.props.sendOffer(acceptOfferData);
    }
  }
  logout = () => {
    localStorage.clear();
    window.location.href = '/';
  }
  reject_Offer(event, rejectOfferData, index) {
    this.setState({
      rideRequestProcessingRow: index
    })
    this.props.rejectOffer(rejectOfferData);
  }
  deleteRide(event, deleteOfferData) {
    this.props.deleteRide(deleteOfferData);
  }
  goHomeScreen = (e) => {
    this.props.history.push('/home')
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
    let OfferDetails = this.props.offerIdData;
    OfferDetails = OfferDetails || this.offerId;
    if (this.props.acceptOfferSuccess) {
      OfferDetails.availableSeats = OfferDetails.availableSeats - 1;
      this.props.clearNotification();
    }
    // if(this.props.rejectOfferSuccess){
    //   OfferDetails.availableSeats = OfferDetails.availableSeats;

    // }
    if (this.props.isDeletingSuccess) {
      return (
        <div>
          <MuiThemeProvider>
            <React.Fragment>
              <PersistentDrawerLeft
                history={this.props.history} />
              <Grid container spacing={12}>
                <div class="loader"></div>
              </Grid>
            </React.Fragment></MuiThemeProvider>
        </div>
      )
    }
    if (this.props.successDeleteMsg) {
      this.props.clearDeleteSuccessNotifications();
      this.props.history.push('/home')
    }

    return (<div>
      <MuiThemeProvider>
        <React.Fragment>
          <PersistentDrawerLeft
            history={this.props.history} />
          <form className={classes.container} >
            <legend> Your Details</legend>

            <Grid container spacing={12}>
              <Grid item xs={3}>
                <TextField
                  disabled
                  id="standard-textarea"
                  label="Starting Point"
                  value={OfferDetails.startLocation}
                  placeholder="starting  point"
                  className={classes.textField}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  disabled
                  id="standard-textarea"
                  label="Ending point"
                  value={OfferDetails.endLocation}
                  placeholder="Ending point"
                  className={classes.textField}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  disabled
                  id="standard-textarea"
                  label="Date & Time"
                  value={moment(OfferDetails.departureDate, 'YYYY-MM-DD[T]HH:mm:ss:SSS').format('MMMM Do YYYY, h:mm a')}
                  placeholder="Date & Time"
                  className={classes.textField}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  disabled
                  id="standard-textarea"
                  label="Available Seats"
                  placeholder="Available Seats"
                  value={OfferDetails.availableSeats}
                  className={classes.textField}
                  margin="normal"
                /></Grid>
              <Button
                variant="contained" color="secondary" className={classes.button}
                onClick={(e) => this.deleteRide(e, this.props.offerCode)}>
                Delete Offer
               </Button>
              <span className='Button-spaces'>
                <Button
                  variant="contained" className={classes.button}
                  onClick={(e) => this.goHomeScreen(e)}>
                  Back
               </Button>
              </span>

            </Grid>
          </form>
        </React.Fragment></MuiThemeProvider>
      <hr />

      {OfferDetails.rideRequests.length === 0 ?
        <legend>
          No Requests Yet!
          </legend>
        : (OfferDetails.rideRequests && OfferDetails.rideRequests.map((details, index) => {
          return (
            <ExpansionPanel defaultExpanded>
              <ExpansionPanelSummary className={classes.panelSummary} expandIcon={<ExpandMoreIcon />}>
                <div className={classes.column}>
                  <Typography className={classes.heading}><b>Start Point:</b> {details.startLocation}</Typography></div>
                <div className={classes.column}>
                  <Typography className={classes.heading}><b>End Point:</b> {details.endLocation}</Typography></div>
                <div className={classes.column}>
                  {(this.props.acceptshowLoader || this.props.rejectshowLoader) && this.state.rideRequestProcessingRow === index ?
                    <div>
                      <span>
                        <img src="/assets/loading.svg" alt="loading" className="login-loading" />
                      </span>
                    </div>
                    :
                    details.status == 'PENDING' ?
                      <div className={classes.column}>
                        <span className='btn-accept'>
                          <Button size="small" color="primary" variant="contained" disabled={OfferDetails.availableSeats ? false : true}
                            onClick={(event) => this.accept_Offer(event, details, index)}>
                            Accept Offer
                </Button>
                        </span>
                        <span>
                          <Button size="small" color="primary" variant="contained"
                            onClick={(event) => this.reject_Offer(event, details, index)}>
                            Reject Offer
          </Button>
                        </span>
                      </div> : ('')

                  }
                </div>


              </ExpansionPanelSummary>

              <ExpansionPanelActions>
                <div className={classes.column}>
                  <Typography className={classes.heading}><b>Name:</b> {details.user.name}</Typography></div>
                <div className={classes.column}>
                  <Typography className={classes.heading}><b>Email:</b> {details.user.email}</Typography></div>
                <div className={classes.column}>
                  <Typography className={classes.heading}><b>Mobile:</b> {details.user.mobileNumber}</Typography></div>
              </ExpansionPanelActions>

              <ExpansionPanelActions>
                <div className={classes.column}>
                  <Typography className={classes.heading}><b>You'll Get:</b> {'₹'} <span>{details.rideCharges}</span></Typography></div>
                <div className={classes.column}>
                  <Typography className={classes.heading}><b>Gender:</b> {details.user.gender}</Typography></div>
                <div className={classes.column}>
                  <Typography className={classes.heading}><b>Status:</b> {details.status}</Typography></div>
              </ExpansionPanelActions>
              <Divider />
            </ExpansionPanel>)
        }))


      }


    </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    offerCode: state.offerIdCheck,
    offerIdData: state.offerIdCheck.offerIdData,
    acceptshowLoader: state.acceptOfferById.showLoader,
    acceptOffer: state.acceptOfferById.loginData,
    acceptOfferSuccess: state.acceptOfferById.successMsg,
    rejectshowLoader: state.rejectOfferById.showLoader,
    rejectOffer: state.rejectOfferById.loginData,
    rejectOfferSuccess: state.rejectOfferById.successMsg,
    successDeleteMsg: state.deleteOfferedRide.successMsg,
    isDeletingSuccess: state.deleteOfferedRide.isDeleting,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    sendOffer: (accepting) => dispatch(acceptOffer.accpetingOfferRequest(accepting)),
    rejectOffer: (reject) => dispatch(rejectOffer.rejectingOfferRequest(reject)),
    deleteRide: (deleteOffers) => dispatch(deleteOffer.deletingOfferRequest(deleteOffers)),
    sendOfferIdRequest: (publishDetails) => dispatch(offerId.sendOfferIdRequest(publishDetails)),
    clearDeleteSuccessNotifications: () => dispatch(deleteOffer.clearDeleteSuccessNotifications()),
    clearNotification: () => dispatch({ type: 'CLEAR_NOTIFICATINS' })

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(OfferId)));  