import ACTIONS from './../constants/actions';

export default (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.SEND_LDAP_SIGNUP_REQUEST:
      return { ...state, ldapErrMsg: false, ldapSuccessMsg: false, isLdapFetching: true }

    case ACTIONS.FETCH_LDAP_SIGNUP_ERROR:
      return { ...state, ldapErrMsg: action.payload, isLdapFetching: false, ldapSuccessMsg: false };

    case 'CLEAR_LDAP_SIGNUP_NOTIFICATIONS':
      return { ...state, ldapErrMsg: undefined, ldapSuccessMsg: undefined, hideForm: false };

    case ACTIONS.FETCH_LDAP_SIGNUP_SUCCESS:
      return { ...state, ldapSignupData: action.payload, ldapSuccessMsg: true, ldapErrMsg: undefined, isLdapFetching: false };

    default:
      return { ...state };

  }

}
