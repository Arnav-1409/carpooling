import ACTIONS from './../constants/actions';

export default (state, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_YOUR_BOOKINGS_DATA:
      return { ...state, yourBookingsError: false, yourBookingsSuccess: false, yourBookingsFetching: true }
    case ACTIONS.YOUR_BOOKINGS_DATA_ERROR:
      return { ...state, yourBookingsError: true, yourBookingsErrorMessage: action.payload, yourBookingsFetching: false, yourBookingsSuccess: false };
    case ACTIONS.YOUR_BOOKINGS_DATA_SUCCESS:
      return { ...state, yourBookingsData: action.payload, yourBookingsSuccess: true, yourBookingsError: undefined, yourBookingsFetching: false };
    case ACTIONS.CLEAR_YOUR_BOOKINGS_NOTIFICATON:
      return { ...state, yourBookingsSuccess: undefined, yourBookingsFetching: undefined };

    default:
      return { ...state };

  }

}