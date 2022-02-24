import ACTIONS from '../constants/actions';

export const sendSignupRequest = (signupDetails) => {
	let signupDetail={};
	signupDetail.email = signupDetails.email
	signupDetail.name = signupDetails.fullName
	signupDetail.mobileNumber = signupDetails.phoneNumber
  signupDetail.gender = signupDetails.gender
  signupDetail.firstName = signupDetails.firstName
  signupDetail.lastName = signupDetails.lastName
	return {
		type: ACTIONS.SEND_SIGNUP_REQUEST,
		payload: signupDetail
	};
}
export const fetchSubmitSuccess = (submitSuccess) => {

	return {
		type: ACTIONS.FETCH_SIGNUP_SUCCESS,
		payload: submitSuccess
	}
}

export const fetchSubmitError = (errorMsg) => {
	return {
		type: ACTIONS.FETCH_SIGNUP_ERROR,
		payload: errorMsg
	}
}
export const clearSignUpNotifications = () => {
	return {
		type: ACTIONS.CLEAR_SIGN_NOTIFICATINS
	}
}