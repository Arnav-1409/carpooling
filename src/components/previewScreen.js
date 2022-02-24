import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './OfferARide.css';
import 'date-fns';
import Snackbar from '@material-ui/core/Snackbar';
import './OfferARide.css';
import './spinners.css';
import { withStyles } from '@material-ui/core/styles';
import { publishActions, finalPublish } from './../actions';
import moment from "moment";
import ACTIONS from '../constants/mapScriptKeyActions';
import PersistentDrawerLeft from './appbar';

const styles = theme => ({
  root: {
    maxWidth: 250,

  },
  slider: {
    padding: '10px 0px',
  },
  button: {
    margin: theme.spacing.unit,
  },
  grown: {
    flexGrow: 120,
    marginTop: '14px',
    color: 'white',
    fontSize: '24px',
    fontWeight: '400',

  },
});
class PreviewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapIsReady: false,
      startingPoint: { label: '', value: ' ' },
      endingPoint: { label: '', value: ' ' },
      showMessage: false,
      theme: '',
      message: ''
    }

  }
  submitRide = (e, Review) => {
    e.preventDefault()
    this.props.sendReviewedRequest(Review)
  }
  goHomeScreen = (e) => {
    this.props.history.push('/home')
  }
  goToBackScreen = (e, Review) => {
    this.props.history.goBack();
  }
  logout = () => {
    localStorage.clear();
    window.location.href = '/';
  }
  backButton = (e) => {
    this.props.history.push('/home')
  }

  /*Map Integration*/

  mapIniialize() {
    const script = document.createElement('script');
    script.src = ACTIONS.SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', () => {
      this.setState({ mapIsReady: true });
    });
  }
  initMap = (startLocation, endLocation, encodingPath) => {

    let vm = this;
    let encodedPath = encodingPath;
    startLocation = startLocation;
    endLocation = endLocation;
    let flightPlanCoordinates = [];
    let polylinePaths = [];
    var map = new window.google.maps.Map(document.getElementById('map2'), {
      zoom: 3,
      center: { lat: 18.56, lng: 73.77 },
    });
    function zoomToObject(obj) {
      var bounds = new window.google.maps.LatLngBounds();
      var points = obj.getPath().getArray();
      for (var n = 0; n < points.length; n++) {
        bounds.extend(points[n]);
      }
      map.fitBounds(bounds);
    }

    var rideLatLng = window.google.maps.geometry.encoding.decodePath(encodedPath);
    var lat = rideLatLng[0].lat();
    var lng = rideLatLng[0].lng();

    let directionPath = this.props.ReviewData.selectedRidePath;



    let flightPath = rideLatLng;
    var ridePolyline = new window.google.maps.Polyline({
      path: rideLatLng,
      geodesic: false,
      strokeColor: '#4B77BE',
      strokeWeight: 7,
      icons: [
        {
          icon: symbolOne,
          offset: '0%'
        }, {
          icon: symbolOne,
          offset: '100%'
        }
      ]
    });
    var ridePolylineInner = new window.google.maps.Polyline({
      path: rideLatLng,
      geodesic: false,
      strokeColor: '#00B5FF',
      strokeWeight: 4,
      icons: [
        {
          icon: symbolOne,
          offset: '0%'
        }, {
          icon: symbolOne,
          offset: '100%'
        }
      ]
    });
    var originInfo = new window.google.maps.InfoWindow({
      content: 'Origin'
    });

    var destinationInfo = new window.google.maps.InfoWindow({
      content: 'Destination'
    });
    ridePolyline.setMap(map);
    ridePolylineInner.setMap(map);


    zoomToObject(ridePolyline);
    var originMarker = new window.google.maps.Marker({
      position: rideLatLng[0],
      map: map,
      opacity: 1,
      animation: window.google.maps.Animation.DROP
    });
    originInfo.open(map, originMarker);
    var destMarker = new window.google.maps.Marker({
      position: rideLatLng[(rideLatLng.length - 1)],
      map: map,
      opacity: 1,
      animation: window.google.maps.Animation.DROP
    });
    destinationInfo.open(map, destMarker);

    var symbolOne = {
      path: window.google.maps.SymbolPath.CIRCLE,
      strokeColor: '#000',
      strokeWeight: 2,
      fillColor: '#fff',
      fillOpacity: 1,
      scale: 4
    };
    function setDistancePopup(ridePolyline, rideLatLng) {
      // to get disatnce
      let flightPath = rideLatLng.map((position) => {
        return {
          lat: position.lat(),
          lng: position.lng()
        }
      })

      let distanceInfoPosition = flightPath[Math.round(flightPath.length / 2)];

      let distanceInMeters = window.google.maps.geometry.spherical.computeLength(ridePolyline.getPath().getArray());
      let distanceInKm = Math.round(distanceInMeters / 10) / 100 + ' km';


      // to get duration
      var directionsService = new window.google.maps.DirectionsService();
      var breakPoint = Math.round(flightPath.length / 20);
      var request = {
        origin: flightPath[0], // LatLng|string
        destination: flightPath[(flightPath.length - 1)], // LatLng|string
        travelMode: window.google.maps.DirectionsTravelMode.DRIVING,
        waypoints: flightPath.filter((latLng, index) => {
          return index % breakPoint === 0;
        }).map((latLng) => {
          return {
            location: latLng,
            stopover: false
          }
        })
      };

      directionsService.route(request, function (response, status) {
        var point = '';
        if (status === 'OK') {
          var point = response.routes[0].legs[0];
        }
        var duration = point && point.duration ? point.duration.text : '';
        var durationBlock = duration ?
          `<div class='duration-block'>
                                <img src="/assets/clock.svg" alt="loading" className="login-loading" />
                                <div class='duration-info'>`+ duration + `</div>
                              </div>` : '';
        var infoHtml = `<section class='info-section'>
                            `+ durationBlock + `
                            <div class='distance-info'>`+ distanceInKm + `</div>
                          <section>`;

        var distanceInfo = new window.google.maps.InfoWindow({
          content: infoHtml,
          position: distanceInfoPosition
        });
        distanceInfo.open(map);
      });
    }
    setDistancePopup(ridePolyline, rideLatLng);

    function handelPolyClick(eventArgs, polyLine) {
      // now you can access the polyLine
      vm.setState({
        selectedPath: polyLine.get("id"),
        showButton: true
      })
      polyLine.setOptions({ strokeColor: '#003399' });
      polyLine.setOptions({ strokeWeight: 6 });
      resetNonSelectedPolylines(polyLine, polyLine.get("id"));
    };

    function resetNonSelectedPolylines(polyLine, pathSummary) {
      if (flightPlanCoordinates != undefined) {
        for (var i = 0; i < polylinePaths.length; i++) {
          if (polylinePaths[i].get("id") == pathSummary) {
            continue;
          } else {
            polylinePaths[i].setOptions({ strokeColor: '#009999' });
            polylinePaths[i].setOptions({ strokeWeight: 4 });
          }
        }
      }
    };
  }


  componentDidUpdate(prevProps, prevState) {
    let Sp = this.props.ReviewData.startLocation;
    let Ep = this.props.ReviewData.endLocation;
    let encodingPath = this.props.ReviewData.encodedPath
    if (this.state.mapIsReady !== prevState.mapIsReady || encodingPath != undefined) {
      try {
        this.initMap(Sp, Ep, encodingPath);
      } catch (e) {

      }
    }
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
    const { fullScreen } = this.props;
    if (this.state.showMessage) {
      setTimeout(() => {
        this.setState({
          showMessage: false,
        })
      }, 5000);
      setTimeout(() => {
        this.props.history.push('/offerride');
      }, 5000)
    }

    const { classes } = this.props;
    let PublishArray = localStorage.getItem('Review') ? JSON.parse(localStorage.getItem('Review')) : [];
    localStorage.setItem('Publish', JSON.stringify(PublishArray));
    let OfferReview = JSON.parse(localStorage.getItem('Publish'));
    if (this.props.successMsg) {
      if (!this.props.submitting) {
        this.props.clearOfferRideNotification();
        this.props.history.push('/success');
      }
    }
    if (this.props.errorMsgPublishing) {
      this.setState({
        showMessage: true,
        theme: 'error',
        message: this.props.errorMsgPublishing
      })
      this.props.clearOfferRideNotification();
    }

    if (this.props.submitting) {
      return (
        <div class="loader"></div>
      )
    }
    return (<div>
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
            <form className='FormStyle' onSubmit={(e) => this.submitRide(e, this.props.ReviewData)}>
              <fieldset>
                <legend>Review Details</legend>
                <div >
                  <b>Starting Point</b> : {this.props.ReviewData.startLocation}
                </div>
                <br />
                <div >
                  <b>Ending Point</b> : {this.props.ReviewData.endLocation}
                </div>
                <br />
                <div >
                  <b>Date</b>: {moment(this.props.date, 'YYYY-MM-DD[T]HH:mm:ss:SSS').format('MMMM Do YYYY, h:mm a')}
                </div>
                <br />
                <div >
                  <b>Selected Path</b> : {this.props.ReviewData.selectedRidePath}
                </div>
                <br />
                <div >
                  <b>Available Seats</b> : {this.props.ReviewData.availableSeats}
                </div>
                <br />
                <div >
                  <b>Vehicle</b> : {this.props.ReviewData.vehicle}
                </div>
                <br />
                <div>

                  <b>You'll Get</b> :{'₹'} {this.props.isOfferFetching ?
                    <span>
                      <img src="/assets/loading.svg" alt="loading" className="login-loading" />
                    </span>
                    : <span>{this.props.ReviewData.charges}</span>
                  }

                </div>
                <br />
                <Button type='Submit'
                  variant="contained" color="primary">
                  Submit
                </Button>
                <Button
                  variant="contained" className={classes.button}
                  onClick={(e) => this.goToBackScreen(e, this.props.ReviewData)}>
                  Back
               </Button>
              </fieldset>
            </form>
            <Grid item xs={6}>
              <div className="full-height-map">
                <div id='map2' ></div>
              </div>
            </Grid>
          </Grid>

        </React.Fragment>
      </MuiThemeProvider>
    </div>
    )
  }
  componentDidMount() {
    if (this.props.location.state && this.props.location.state.data) {
      let formData = this.props.location.state.data;
      this.setState({
        finalData: formData
      }, () => this.mapIniialize.bind(this));

      this.props.sendPublishRequest(this.props.location.state.data);
    }
  }
  componentWillUnmount() {
    this.props.ClearPublishData();
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    errorMsgPublishing: state.publishOffer.errorMsg,
    offerData: state.finalPublish.offerData,
    isOfferFetching: state.publishOffer.isOfferFetching,
    successMsg: state.finalPublish.successMsg,
    errMsg: state.finalPublish.errMsg,
    PreviewData: state.finalPublish.PreviewData,
    ReviewData: state.publishOffer,
    date: state.publishOffer.departureDate,
    submitting: state.finalPublish.isOfferFetching,
    encodedPath: state.publishOffer.encodedPath,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendPublishRequest: (publishDetails) => dispatch(publishActions.sendPublishRequest(publishDetails)),
    sendReviewedRequest: (publishDetails) => dispatch(finalPublish.sendReviewedRequest(publishDetails)),
    ClearPublishData: () => dispatch({ type: 'CLEAR_BACK_LOG' }),
    clearOfferRideNotification: () => dispatch({ type: 'CLEAR_PUBLISH_NOTIFICATION' })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(PreviewScreen)));  