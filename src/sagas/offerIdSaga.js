import ACTIONS from '../constants/actions';
import { take, call, put, select, all } from 'redux-saga/effects';
import { offerId } from './../actions';
import axios from 'axios';


function uploadDetails(API_URL, loginDetails) {
  let token = JSON.parse(localStorage.getItem('token'));
    if(loginDetails.data){
    
        loginDetails.id = loginDetails.data.id 
        loginDetails.userEmail = loginDetails.userEmail.email
    }
    let LOGIN_URL = API_URL + '/offer/' + loginDetails.id+'?email='+loginDetails.userEmail;
    return axios({
        url: LOGIN_URL,
        data: {},
        method: 'get',  
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer' + ' ' + token,
        }
    })
}

export default function* offerIdCheck() {
    while (true) {
        const action = yield take(ACTIONS.SEND_OFFERID_REQUEST);
        try {
            const API_URL = yield select((state) => state.app.API_URL);
            const [response] = yield all([call(uploadDetails, API_URL, action.payload)]);

            const item = response && response.data;
            if (item.id) {
                yield put(offerId.fetchOfferIdSuccess(item));
            } else {
                yield put(offerId.fetchOfferIdError(JSON.stringify(item)));
            }

        }
        catch (e) {
            yield put(offerId.fetchOfferIdError(JSON.stringify(e.response.data.message)))
        }
    }
}