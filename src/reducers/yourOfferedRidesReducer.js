import ACTIONS from './../constants/actions';

export default (state, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_YOUR_OFFERED_RIDES_DATA:

      return { ...state, yourOfferedRidesError: false, yourOfferedRidesSuccess: false, yourOfferedRidesFetching: true }
    case ACTIONS.YOUR_OFFERED_RIDES_DATA_ERROR:
      return { ...state, yourOfferedRidesError: action.payload, yourOfferedRidesFetching: false, yourOfferedRidesSuccess: false };
    case ACTIONS.YOUR_OFFERED_RIDES_SUCCESS:
      return { ...state, yourOfferedRidesData: action.payload, yourOfferedRidesSuccess: true, yourOfferedRidesError: undefined, yourOfferedRidesFetching: false };
    case ACTIONS.CLEAR_YOUR_OFFERED_RIDES_NOTIFICATON:
      return { ...state, yourOfferedRidesError: undefined, yourOfferedRidesSuccess: undefined, yourOfferedRidesFetching: undefined };

    default:
      return { ...state };

  }

}