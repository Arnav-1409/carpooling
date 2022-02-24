import ACTIONS from '../constants/actions';

export const fetchShuttleRides = (data) =>{
    return{
        type: ACTIONS.FETCH_SHUTTLE_LISTS,
		    payload: data
	};
}

export const fetchShuttleRidesSuccess = (data) => {
	return {
		type: ACTIONS.FETCH_SHUTTLE_LISTS_SUCCESS,
		payload: data
	};
}

export const fetchShuttleRidesListError = (data) => {
	return {
		type: ACTIONS.FETCH_SHUTTLE_LISTS_ERROR,
		payload: data
	}
}