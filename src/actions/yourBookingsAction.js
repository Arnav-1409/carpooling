import ACTIONS from '../constants/actions';

export const fetchYourBookingsData = (data) => {
  return {
    type: ACTIONS.FETCH_YOUR_BOOKINGS_DATA,
    payload: data,
  };
}

export const yourBookingsDataSuccess = (yourBookingsSuccess) => {
  return {
    type: ACTIONS.YOUR_BOOKINGS_DATA_SUCCESS,
    payload: yourBookingsSuccess,
  };
}

export const yourBookingsDataError = (yourBookingsError) => {
  return {
    type: ACTIONS.YOUR_BOOKINGS_DATA_ERROR,
    payload: yourBookingsError,
  };
}

export const clearYourBookingsNotification = () => {
  return {
    type: ACTIONS.CLEAR_YOUR_BOOKINGS_NOTIFICATON,
  };
}




