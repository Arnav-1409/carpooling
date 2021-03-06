import ACTIONS from '../constants/actions';
import { take, call, put, select, all } from 'redux-saga/effects';
import { submitActions } from './../actions';
import axios from 'axios';
import actions from '../constants/actions';

function uploadDetails(API_URL, loginDetails) {
    let LOGIN_URL = API_URL + '/user';
    return axios({
        url: LOGIN_URL,
        method: 'POST',
        data: loginDetails,
        headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        
}
export default function* signUp() {
    while (true) {

        const action = yield take(ACTIONS.SEND_SIGNUP_REQUEST);
        try {
            const API_URL = yield select((state) => state.app.API_URL);
            const [response] = yield all([call(uploadDetails, API_URL, action.payload)]);
            const item = response && response.data;
            if (item && item.email) {
                yield put(submitActions.fetchSubmitSuccess(item));
            } else {
                yield put(submitActions.fetchSubmitError(JSON.stringify(item)));
            }

        }
        catch (e) {
            yield put(submitActions.fetchSubmitError(JSON.stringify(e.response.data.message)))
        }
    }
}