import ACTIONS from '../constants/actions';
import { take, call, put, select, all } from 'redux-saga/effects';
import { ldapEnabledActions } from './../actions';
import axios from 'axios';

function ldapEnabledDetails(API_URL) {
  let LOGIN_URL = API_URL + '/ldap/enable';
  return axios({
    url: LOGIN_URL,
    method: 'GET',
    data: {},
    headers: {
      "Accept": "application/json",
    }
  })

}
export default function* ldapEnabled() {
  while (true) {

    const action = yield take(ACTIONS.FETCH_LDAP_ENABLED_REQUEST);
    try {
      const API_URL = yield select((state) => state.app.API_URL);
      const [response] = yield all([call(ldapEnabledDetails, API_URL, action.payload)]);
      debugger
      const item = response && response.data;
      console.log('item enabled', item);
      if (item) {
        yield put(ldapEnabledActions.fetchLdapEnabledSuccess(item));
      } else {
        yield put(ldapEnabledActions.fetchLdapEnabledError(JSON.stringify(item)));
      }
    }
    catch (e) {
      yield put(ldapEnabledActions.fetchLdapEnabledError(JSON.stringify(e.response.data.message)));
    }
  }
}
