import ACTIONS from '../constants/actions';
import { take, call, put, select, all } from 'redux-saga/effects';
import { loginAction } from './../actions';
import axios from 'axios';
import actions from '../constants/actions';

function uploadDetails(API_URL, loginDetails) {
  let LOGIN_URL = API_URL + '/user';
  let token = JSON.parse(localStorage.getItem('token'));
  return axios({
    url: LOGIN_URL,
    data: {},
    method: 'get',
    params: loginDetails,
    headers: {
      // 'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'bearer' + ' ' + token,
    }
  })
    .catch(err => {
      console.log(err);
    });
}
export default function* signUp() {
  while (true) {
    const action = yield take(ACTIONS.SEND_LOGIN_REQUEST);
    try {
      const API_URL = yield select((state) => state.app.API_URL);
      const [response] = yield all([call(uploadDetails, API_URL, action.payload)]);
      const item = response && response.data;
      if (item.constructor === Array) {
        yield put(loginAction.fetchLoginSuccess(item));
      } else {
        yield put(loginAction.fetchLoginError(JSON.stringify(item)));
      }

    }
    catch (e) {
      yield put(loginAction.fetchLoginError('Server Error'))
    }
  }
}
