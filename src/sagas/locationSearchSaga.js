import ACTIONS from '../constants/actions';
import { call, put, select, all, takeLatest } from 'redux-saga/effects';
import { locationSearchActions } from './../actions';
import axios from 'axios';

function uploadDetails(API_Upload_Detail, searchLocation) {
  let token = JSON.parse(localStorage.getItem('token'));
  return axios({
    url: API_Upload_Detail + '/places?' + 'query=' + searchLocation,
    method: 'GET',
    data: {},
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'bearer' + ' ' + token,
    }
  })
    .catch(err => {
      console.log(err);
    });
}

export default function* signUp() {
  yield takeLatest(ACTIONS.LOCATION_SEARCH_REQUEST, signUpSaga);
}

function* signUpSaga(action) {
  try {
    const API_URL = yield select((state) => state.app.API_URL);
    const [response] = yield all([call(uploadDetails, API_URL, action.payload)]);
    const item = response && response.data;
    if (item) {
      yield put(locationSearchActions.locationSearchSuccess(item));
    } else {
      yield put(locationSearchActions.locationSearchError(JSON.stringify(item)));
    }

  }
  catch (e) {
    console.log(e);
  }
}