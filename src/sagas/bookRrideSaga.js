import ACTIONS from '../constants/actions';
import { take, call, put, select, all } from 'redux-saga/effects';
import { bookRideActions } from './../actions';
import axios from 'axios';

function bookRideDetails (API_URL,bookRideDetails) {
    bookRideDetails.radius = "2000";
    let LOGIN_URL = API_URL + '/ride/find';
    let token = JSON.parse(localStorage.getItem('token'));
	 return axios({
    url: LOGIN_URL,
    method: 'GET',
    data: {},
    params: bookRideDetails,    
    headers: {
        'ACCEPT': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'bearer' + ' ' + token,
    }
    })
    .catch(err => {
        console.log(err);
    });
}

export default function* bookRide() {
    while(true){
      const action = yield take(ACTIONS.FETCH_BOOKRIDE_LISTS);
      try{
              const API_URL = yield select((state) => state.app.API_URL);
              const [response] = yield all([call(bookRideDetails,API_URL,action.payload)]);

              const items = response.data;
              if(typeof items === 'undefined'){
              }
              else {
                 yield put(bookRideActions.fetchBookRideListSuccess(items));
              }
      }
          catch(e){
            yield put(bookRideActions.fetchBookRideListError());
        }
    }
    }
  