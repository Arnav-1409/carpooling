import ACTIONS from './../constants/actions';

export default (state, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_LDAP_ENABLED_REQUEST:
      return { ...state, ldapEnabledErr: false, ldapEnabledSuccessMsg: false, isLdapEnabledFetching: true, }

    case ACTIONS.FETCH_LDAP_ENABLED_SUCCESS:
      return { ...state, ldapEnabledErr: false, ldapEnabledSuccessMsg: true, isLdapEnabledFetching: false, isLdapEnabled: action.payload, }

    case ACTIONS.FETCH_LDAP_ENABLED_ERROR:
      debugger
      return { ...state, ldapEnabledErr: true, ldapEnabledSuccessMsg: false, isLdapEnabledFetching: false, isLdapEnabled: action.payload, }

    case 'ACTIONS.CLEAR_LDAP_ENABLED_NOTIFICATIONS':
      return { ...state, ldapEnabledErr: undefined, ldapEnabledSuccessMsg: undefined, isLdapEnabledFetching: undefined, }

    default:
      return { ...state };

  }
}
