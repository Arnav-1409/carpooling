import ACTIONS from '../constants/actions';
import { take, call, put, select, all } from 'redux-saga/effects';
import { shuttleRideActions } from './../actions';
import axios from 'axios';

function shuttleRides(API_Upload_Detail, date) {
  let API_URL = API_Upload_Detail + '/shuttle/find/' + date;
  let token = JSON.parse(localStorage.getItem('token'));
    return axios({
        url: API_URL,
        method: 'GET',
        data: {},
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer' + ' ' + token,
        }
    })
        
}
export default function* shuttleRidesList() {
    while (true) {
        const action = yield take(ACTIONS.FETCH_SHUTTLE_LISTS);
        try {
            const API_URL = yield select((state) => state.app.API_URL);

            const [response] = yield all([call(shuttleRides, API_URL, action.payload)]);
            
            const item = response && response.data;
            if (item) {
             
                yield put(shuttleRideActions.fetchShuttleRidesSuccess (item));
            } else {
                yield put(shuttleRideActions.fetchShuttleRidesListError(JSON.stringify(item)));
            }
         
        }
        catch (e) {
            yield put(shuttleRideActions.fetchShuttleRidesListError(JSON.stringify(e.response.data.message)));
        }
    }
}