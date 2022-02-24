import ACTIONS from '../constants/actions';
import { take, call, put, select, all } from 'redux-saga/effects';
import { publishActions } from './../actions';
import axios from 'axios';
import actions from '../constants/actions';

function uploadDetails(API_Upload_Detail, publishDetails) {
  let user = JSON.parse(localStorage.getItem('user'));
  let token = JSON.parse(localStorage.getItem('token'));
  return axios({
    url: API_Upload_Detail + '/ride?' + 'email' +'=' + user.email + '&showDetailsOnly' + '=' + 'true',
    method: 'POST',
    data: publishDetails,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'bearer' + ' ' + token,
    }
  })

}
export default function* signUp() {
  while (true) {
    const action = yield take(ACTIONS.SEND_PUBLISH_REQUEST);
    try {
      const API_URL = yield select((state) => state.app.API_URL);
      const [response] = yield all([call(uploadDetails, API_URL, action.payload)]);

      const item = response && response.data;
      if (item) {

        yield put(publishActions.fetchPublishSuccess(item));
      } else {
        yield put(publishActions.fetchPublishError(JSON.stringify(item)));
      }

    }
    catch (e) {
      yield put(publishActions.fetchPublishError(JSON.stringify(e.response.data.message)));
    }
  }
}