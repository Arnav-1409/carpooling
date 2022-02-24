import ACTIONS from './../constants/actions';

const initialState = {
  yourBookingsData: [],
};

export default (state = initialState, action) => {
  switch (action.type) {

    case ACTIONS.SEND_CANCELBOOKEDRIDE_REQUEST:
      return { ...state, errMsg: false, successMsg: false, isFetching: true, showLoader: true }

    case ACTIONS.FETCH_CANCELBOOKEDRIDE_ERROR:
      return { ...state, errMsg: action.payload, isFetching: false, successMsg: false, showLoader: false };
    case ACTIONS.FETCH_CANCELBOOKEDRIDE_SUCCESS:
      return { ...state, cancelRide: action.payload, successMsg: true, isFetching: false, errMsg: undefined, showLoader: false };
    case ACTIONS.CLEAR_CANCEL_NOTIFICATIONS:
      return { ...state, errMsg: undefined, successMsg: undefined, isFetching: false, showLoader: false };
    default:
      return { ...state };

  }

}