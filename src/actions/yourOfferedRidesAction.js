import ACTIONS from '../constants/actions';

export const fetchYourOfferedRidesData = (data) => {
  return {
    type: ACTIONS.FETCH_YOUR_OFFERED_RIDES_DATA,
    payload: data,
  };
}

export const yourOfferedRidesSuccess = (yourOfferedRidesSuccess) => {
  return {
    type: ACTIONS.YOUR_OFFERED_RIDES_SUCCESS,
    payload: yourOfferedRidesSuccess,
  };
}

export const yourOfferedRidesDataError = (yourOfferedRidesError) => {
  return {
    type: ACTIONS.YOUR_OFFERED_RIDES_DATA_ERROR,
    payload: yourOfferedRidesError,
  };
}

export const clearYourOfferedRidesNotification = () => {
  return {
    type: ACTIONS.CLEAR_YOUR_OFFERED_RIDES_NOTIFICATON,
  };
}




