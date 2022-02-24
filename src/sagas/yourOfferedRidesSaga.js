import ACTIONS from '../constants/actions';
import { take, call, put, select, all } from 'redux-saga/effects';
import { yourOfferedRidesActions } from '../actions';
import axios from 'axios';

function yourOfferedRidesDetail(API_URL, emailId) {
  let LOGIN_URL = API_URL + '/user/offer/?email=' + emailId;
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
export default function* yourOfferedRidesUpdate() {
  while (true) {
    const action = yield take(ACTIONS.FETCH_YOUR_OFFERED_RIDES_DATA);
    try {
      const API_URL = yield select((state) => state.app.API_URL);
      const [response] = yield all([call(yourOfferedRidesDetail, API_URL, action.payload)]);
      const item = response && response.data;
      if (item) {
        yield put(yourOfferedRidesActions.yourOfferedRidesSuccess(item));
      } else {
        yield put(yourOfferedRidesActions.yourOfferedRidesDataError(JSON.stringify(item)));
      }

    }
    catch (e) {
      yield put(yourOfferedRidesActions.yourOfferedRidesDataError(JSON.stringify(e.response.data.message)))
    }
  }
}