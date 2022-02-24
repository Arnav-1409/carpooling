import ACTIONS from '../constants/actions';
import { take, call, put, select, all } from 'redux-saga/effects';
import { bookingIdActions} from './../actions';
import axios from 'axios';
import actions from '../constants/actions';

function uploadDetails(API_URL, loginDetails) {
    let LOGIN_URL = API_URL + '/booking/' + loginDetails.bookingId;
    let token = JSON.parse(localStorage.getItem('token'));
    return axios({
        url: LOGIN_URL,
        data: {},
        method: 'get',
        params: loginDetails,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer' + ' ' + token,
        }
    })
}
export default function* bookingIdCheck() {
    while (true) {
        const action = yield take(ACTIONS.SEND_BOOKINGID_REQUEST);
        try {
            const API_URL = yield select((state) => state.app.API_URL);
            const [response] = yield all([call(uploadDetails, API_URL, action.payload)]);

            const item = response && response.data;
            if (item.bookingId) {
                yield put(bookingIdActions.fetchBookingIdSuccess(item));
            } else {
                yield put(bookingIdActions.fetchBookingIdError(JSON.stringify(item)));
            }

        }
        catch (e) {
            yield put(bookingIdActions.fetchBookingIdError(JSON.stringify(e.response.data.message)))
        }
    }
}