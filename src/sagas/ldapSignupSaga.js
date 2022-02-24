import ACTIONS from '../constants/actions';
import { take, call, put, select, all } from 'redux-saga/effects';
import { ldapSignupActions } from './../actions';
import axios from 'axios';
import actions from '../constants/actions';

function ldapSignupDetails(API_URL, loginDetails) {
  let LOGIN_URL = API_URL + '/user';
  let token = JSON.parse(localStorage.getItem('token'));
  return axios({
    url: LOGIN_URL,
    method: 'POST',
    data: loginDetails,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': LOGIN_URL,
      'Authorization': 'bearer' + ' ' + token,
    }
  })

}
export default function* ldapSignUp() {
  while (true) {

    const action = yield take(ACTIONS.SEND_LDAP_SIGNUP_REQUEST);
    try {
      const API_URL = yield select((state) => state.app.API_URL);
      const [response] = yield all([call(ldapSignupDetails, API_URL, action.payload)]);
      const item = response && response.data;
      if (item && item.email) {
        yield put(ldapSignupActions.fetchLdapSubmitSuccess(item));
      } else {
        yield put(ldapSignupActions.fetchLdapSubmitError(JSON.stringify(item)));
      }

    }
    catch (e) {
      yield put(ldapSignupActions.fetchLdapSubmitError(JSON.stringify(e.response.data.message)))
    }
  }
}
