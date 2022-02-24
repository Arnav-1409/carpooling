import ACTIONS from './../constants/actions';

export default (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.SEND_LDAP_LOGIN_REQUEST:
      return { ...state, ldapLoginErrMsg: false, ldapLoginSuccessMsg: false, isLdapLoginFetching: true }

    case ACTIONS.FETCH_LDAP_LOGIN_SUCCESS:
      return { ...state, ldapLoginData: action.payload, ldapLoginSuccessMsg: true, ldapLoginErrMsg: undefined, isLdapLoginFetching: false };

    case ACTIONS.FETCH_LDAP_LOGIN_ERROR:
      return { ...state, ldapLoginErrMsg: action.payload, isLdapLoginFetching: false, ldapLoginSuccessMsg: false };

    case 'CLEAR_LDAP_LOGIN_NOTIFICATIONS':
      return { ...state, ldapLoginErrMsg: undefined, ldapLoginSuccessMsg: undefined, hideForm: false };

    default:
      return { ...state };

  }

}
