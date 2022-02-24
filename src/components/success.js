import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './OfferARide.css'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Feedback from './feedback';
import PersistentDrawerLeft from './appbar';



const styles = theme => ({
  grown: {
    flexGrow: 120,
    marginTop: '14px',
    color: 'white',
    fontSize: '24px',
    fontWeight: '400',

  },
  grow: {
    marginTop: '15px',
    color: 'white'
  },

});

export class Success extends Component {
  constructor() {
    super();

    this.state = {
      rating: 1,
      rating_half_star: 3
    };
  }

  logout = () => {
    localStorage.clear();
    window.location.href = '/';
  }

  goToBackScreen = (e) => {
    this.props.history.push('/home')
  }

  render() {
    const { rating } = this.state;
    const { classes } = this.props;
    let user = localStorage.getItem('user');
    let userEmail = JSON.parse(user)
    let userName = JSON.parse(user)
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <PersistentDrawerLeft
            history={this.props.history} />
          <div className='success-msg'>
            <h1>Thank You For Your Submission</h1>
            <p>You will get an email and sms with further instructions</p>
            <Feedback
              basePage={'success'}
            />
          </div>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    userName: state.bookRideReducer.userName,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    sendFeedback: (feedback) => dispatch(feedback.accpetingOfferRequest(feedback))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(Success)));  
