import ACTIONS from '../constants/actions';
import { take, call, put, select, all } from 'redux-saga/effects';
import { maxCountActions } from './../actions';
import axios from 'axios';

function maxCount(API_Upload_Detail) {
  let API_URL = API_Upload_Detail + '/ride/count';
  let token = JSON.parse(localStorage.getItem('token'));
    return axios({
        url: API_URL,
        method: 'GET',
        data: {},
        params:'',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer' + ' ' + token,
        }
    })
        
}
export default function* maxCountNumber() {
    while (true) {
        const action = yield take(ACTIONS.FETCH_COUNT);
        try {
            const API_URL = yield select((state) => state.app.API_URL);

            const [response] = yield all([call(maxCount, API_URL, action.payload)]);
            
            const item = response && response.data;
            if (item) {
             
                yield put(maxCountActions.fetchCountSuccess (item));
            } else {
                yield put(maxCountActions.fetchCountError(JSON.stringify(item)));
            }
         
        }
        catch (e) {
            yield put(maxCountActions.fetchCountError(JSON.stringify(e.response.data.message)));
        }
    }
}