import ACTIONS from '../constants/actions';

export const sendCancelBookedRideRequest = (cancelBookedRide) => {
  return {
    type: ACTIONS.SEND_CANCELBOOKEDRIDE_REQUEST,
    payload: cancelBookedRide
  };
}

export const fetchCancelBookedRideSuccess = (cancelBookedRideDetails) => {
  return {
    type: ACTIONS.FETCH_CANCELBOOKEDRIDE_SUCCESS,
    payload: cancelBookedRideDetails
  }
}

export const fetchCancelBookedRideError = (cancelBookedRideErrMsg) => {
  return {
    type: ACTIONS.FETCH_CANCELBOOKEDRIDE_ERROR,
    payload: cancelBookedRideErrMsg
  }
}

export const clearCancelNotifications = () => {
  return {
    type: ACTIONS.CLEAR_CANCEL_NOTIFICATIONS,
  };
}
