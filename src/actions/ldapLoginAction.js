import ACTIONS from '../constants/actions';

export const sendLdapLoginRequest = (ldapLoginDetails) => {
  return {
    type: ACTIONS.SEND_LDAP_LOGIN_REQUEST,
    payload: ldapLoginDetails
  };
}
export const fetchLdapLoginSuccess = (ldapLoginSuccess) => {

  return {
    type: ACTIONS.FETCH_LDAP_LOGIN_SUCCESS,
    payload: ldapLoginSuccess
  }
}

export const fetchLdapLoginError = (ldapLoginErrorMsg) => {
  return {
    type: ACTIONS.FETCH_LDAP_LOGIN_ERROR,
    payload: ldapLoginErrorMsg
  }
}
export const clearLdapLoginNotifications = () => {
  return {
    type: ACTIONS.CLEAR_LDAP_LOGIN_NOTIFICATIONS
  }
}