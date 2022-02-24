import ACTIONS from '../constants/actions';
import { take, call, put, select, all } from 'redux-saga/effects';
import { yourBookingsActions } from '../actions';
import axios from 'axios';

function yourBookingDetail(API_URL, emailId) {
  let LOGIN_URL = API_URL + '/user/booking/?email=' + emailId;
  let token = JSON.parse(localStorage.getItem('token'));
  return axios({
    url: LOGIN_URL,
    data: {},
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer' + ' ' + token,
    }
  })
}
export default function* yourBookingsUpdate() {
  while (true) {
    const action = yield take(ACTIONS.FETCH_YOUR_BOOKINGS_DATA);
    try {
      const API_URL = yield select((state) => state.app.API_URL);
      const [response] = yield all([call(yourBookingDetail, API_URL, action.payload)]);
      const item = response && response.data;
      if (item) {
        yield put(yourBookingsActions.yourBookingsDataSuccess(item));
      } else {
        yield put(yourBookingsActions.yourBookingsDataError(JSON.stringify(item)));
      }

    }
    catch (e) {
      yield put(yourBookingsActions.yourBookingsDataError(JSON.stringify(e.response.data.message)))
    }
  }
}