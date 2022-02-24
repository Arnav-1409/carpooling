import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './App.css';
import BookARide from './components/BookARide'
import RideDetailsDisplay from './components/RideDetailsDisplay'
import Main from './components/main';
import OfferARide from './components/OfferARide';
import Login from './components/login';
import Success from './components/success';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import PreviewScreen from './components/previewScreen';
import bookRidePreviewScreen from './components/bookRidePreviewScreen';
import offerId from './components/offerId';
import bookingId from './components/bookingId';
import ldapSignup from './components/ldapSignup';
import ldapLogin from './components/ldapLogin';
import PersistentDrawerLeft from './components/appbar';
import YourBookings from './components/yourBookings';
import YourOfferedRides from './components/yourOfferedRides';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    const Url = this.props.urlState;
    return (
      <div className="App">
        <BrowserRouter basename="/">
          <Switch>
            <Route name='index' path={"/offerCode"} component={offerId} />
            <Route name='index' path={"/offerpreviewscreen"} component={PreviewScreen} />
            <Route name='index' path={"/home"} component={Main} />
            <Route name='index' path={"/offerride"} component={OfferARide} />
            <Route name='index' path={"/bookingpreviewscreen"} component={bookRidePreviewScreen} />
            <Route name='index' path={'/bookride'} component={BookARide} />
            <Route name='index' path={"/findrides"} component={RideDetailsDisplay} />
            <Route name='index' path={'/bookingstatus'} component={bookingId} />
            <Route name='index' path={"/success"} component={Success} />
            <Route name='index' path={"/appbar"} component={PersistentDrawerLeft} />
            <Route name='index' path={"/yourbookings"} component={YourBookings} />
            <Route name='index' path={"/yourofferedrides"} component={YourOfferedRides} />
            <Route name='index' path={'/login'} component={Login} />
            <Route name='index' path={"/signup"} component={ldapSignup} />
            <Route name='index' path={'/'} component={ldapLogin} />
            <Redirect to='/' />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    urlState: state.app.API_URL
  }
}

export default connect(mapStateToProps)(App);
