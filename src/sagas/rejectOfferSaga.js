import ACTIONS from '../constants/actions';
import { take, call, put, select, all } from 'redux-saga/effects';
import { rejectOffer } from './../actions';
import axios from 'axios';

function uploadDetails(API_URL, loginDetails,bookingId) {
    let LOGIN_URL = API_URL +'/booking/'+bookingId+'?'+'rideStatus=DECLINED'
    let token = JSON.parse(localStorage.getItem('token'));
    return axios({
        url: LOGIN_URL,
        method: 'PUT',
        data: loginDetails,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer' + ' ' + token,
        }
    })
        .catch(err => {
            console.log(err);
        });
}
export default function* OfferReject() {
    while (true) {
        
        const action = yield take(ACTIONS.REJECT_OFFER_REQUEST);
        try {
            const API_URL = yield select((state) => state.app.API_URL);
            const payload = action.payload;
            const bookingId = payload.bookingId;
            const [response] = yield all([call(uploadDetails, API_URL,payload,bookingId)]);
            const item = response && response.data;            
            let offerIdData = yield select((state) => state.offerIdCheck.offerIdData);
            let rideRequests = offerIdData.rideRequests
            let indexOfChangedStatus = rideRequests.findIndex(rideObject => rideObject.bookingId === item.bookingId);
            rideRequests[indexOfChangedStatus] = item
            offerIdData.rideRequests = rideRequests
            
            if (item ) {
                yield put(rejectOffer.rejectingOfferSuccess(item));
            } else {
                yield put(rejectOffer.rejectingOfferError(JSON.stringify(item)));
            }

        }
        catch (e) {
            yield put(rejectOffer.rejectingOfferError('Server Error'))
        }
    }
}