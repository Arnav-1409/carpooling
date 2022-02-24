import ACTIONS from '../constants/actions';
import { take, call, put, select, all } from 'redux-saga/effects';
import { confirmBookRequestActions } from './../actions';
import axios from 'axios';
import actions from '../constants/actions';

function confirmBookRequest(API_URL, confirmBookRequestDetails) {
    let LOGIN_URL = API_URL + '/booking';
    let token = JSON.parse(localStorage.getItem('token'));
    return axios({
        url: LOGIN_URL,
        method: 'POST',
        data: confirmBookRequestDetails,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'bearer' + ' ' + token,
        }
    })
}
export default function* bookRequest() {
    while (true) {
        const action = yield take(ACTIONS.CONFIRM_BOOK_REQUEST);
        try {
            const API_URL = yield select((state) => state.app.API_URL);
            const [response] = yield all([call(confirmBookRequest, API_URL, action.payload)]);
            const item = response && response.data;
            if (item) {
                yield put(confirmBookRequestActions.confirmBookRequestSuccess(item));
            } else {
                yield put(confirmBookRequestActions.confirmBookRequestError(JSON.stringify(item)));
            }

        }
        catch (e) {
            yield put(confirmBookRequestActions.confirmBookRequestError(JSON.stringify(e.response.data.message)))
        }
    }
}