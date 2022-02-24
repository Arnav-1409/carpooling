import ACTIONS from '../constants/actions';

export const sendLdapSignupRequest = (ldapSignupDetails) => {
  return {
    type: ACTIONS.SEND_LDAP_SIGNUP_REQUEST,
    payload: ldapSignupDetails
  };
}
export const fetchLdapSubmitSuccess = (ldapSubmitSuccess) => {

  return {
    type: ACTIONS.FETCH_LDAP_SIGNUP_SUCCESS,
    payload: ldapSubmitSuccess
  }
}

export const fetchLdapSubmitError = (ldapErrorMsg) => {
  return {
    type: ACTIONS.FETCH_LDAP_SIGNUP_ERROR,
    payload: ldapErrorMsg
  }
}
export const clearLdapSignupNotifications = () => {
  return {
    type: ACTIONS.CLEAR_LDAP_SIGNUP_NOTIFICATIONS
  }
}