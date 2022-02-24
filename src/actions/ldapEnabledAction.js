import ACTIONS from '../constants/actions';

export const fetchLdapEnabledRequest = () => {
  debugger
  return {
    type: ACTIONS.FETCH_LDAP_ENABLED_REQUEST,
  };
}

export const fetchLdapEnabledSuccess = (ldapEnabledSuccess) => {
  debugger
  return {
    type: ACTIONS.FETCH_LDAP_ENABLED_SUCCESS,
    payload: ldapEnabledSuccess,
  };
}

export const fetchLdapEnabledError = (ldapEnabledError) => {
  debugger
  return {
    type: ACTIONS.FETCH_LDAP_ENABLED_ERROR,
    payload: ldapEnabledError,
  };
}

export const clearLdapEnabledNotifications = () => {
  return {
    type: ACTIONS.CLEAR_LDAP_ENABLED_NOTIFICATIONS
  }
}
