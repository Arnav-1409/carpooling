import ACTIONS from '../constants/actions';
import { take, call, put, select, all } from 'redux-saga/effects';
import { ldapLoginActions } from './../actions';
import axios from 'axios';
import actions from '../constants/actions';

function ldapLoginDetails(API_URL, loginDetails) {
  let LOGIN_URL = API_URL + '/auth/login';
  return axios({
    url: LOGIN_URL,
    method: 'POST',
    data: loginDetails,
    headers: {
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      'Content-Type': 'application/json',
    }
  })

}
export default function* ldapLogin() {
  while (true) {

    const action = yield take(ACTIONS.SEND_LDAP_LOGIN_REQUEST);
    try {
      const API_URL = yield select((state) => state.app.API_URL);
      const [response] = yield all([call(ldapLoginDetails, API_URL, action.payload)]);
      const item = response && response.data;
      if (item && item.token) {
        yield put(ldapLoginActions.fetchLdapLoginSuccess(item.token));
      } else {
        yield put(ldapLoginActions.fetchLdapLoginError(JSON.stringify(item)));
      }
    }
    catch (e) {
      yield put(ldapLoginActions.fetchLdapLoginError(JSON.stringify(e.response.data.message)));
    }
  }
}
