const APP_ACTIONS = {
  CONFIG_LOADED: 'CONFIG_LOADED'
};

const MESSAGE_ACTIONS = {
  SHOW_MESSAGE: 'SHOW_MESSAGE',
  HIDE_MESSAGE: 'HIDE_MESSAGE'
};

const SIGNUP_ACTIONS = {
  SEND_SIGNUP_REQUEST: 'SEND_SIGNUP_REQUEST',
  FETCH_SIGNUP_SUCCESS: 'FETCH_SIGNUP_SUCCESS',
  FETCH_SIGNUP_ERROR: 'FETCH_SIGNUP_ERROR',
  CLEAR_SIGN_NOTIFICATINS: 'CLEAR_SIGN_NOTIFICATINS'
}
const LOGIN_ACTIONS = {
  SEND_LOGIN_REQUEST: 'SEND_LOGIN_REQUEST',
  FETCH_LOGIN_SUCCESS: 'FETCH_LOGIN_SUCCESS',
  FETCH_LOGIN_ERROR: 'FETCH_LOGIN_ERROR',
  CLEAR_LOGIN_NOTIFICATINS: 'CLEAR_LOGIN_NOTIFICATINS',
  CLEAR_LOGIN_SUCCESS_NOTIFICATINS: 'CLEAR_LOGIN_SUCCESS_NOTIFICATINS'
}
const PUBLISH_ACTIONS = {
  SEND_PUBLISH_REQUEST: 'SEND_PUBLISH_REQUEST',
  FETCH_PUBLISH_SUCCESS: 'FETCH_PUBLISH_SUCCESS',
  FETCH_PUBLISH_ERROR: 'FETCH_PUBLISH_ERROR',
}
const FINAL_REVIEWED_ACTIONS = {
  SEND_REVIEWED_REQUEST: 'SEND_REVIEWED_REQUEST',
  FETCH_REVIEWED_SUCCESS: 'FETCH_REVIEWED_SUCCESS',
  FETCH_REVIEWED_ERROR: 'FETCH_REVIEWED_ERROR',
}
const BOOKRIDE_ACTIONS = {
  FETCH_BOOKRIDE_LISTS: 'FETCH_BOOKRIDE_LISTS',
  FETCH_BOOKRIDE_LISTS_SUCCESS: 'FETCH_BOOKRIDE_LISTS_SUCCESS',
  FETCH_BOOKRIDE_LISTS_ERROR: 'FETCH_BOOKRIDE_LISTS_ERROR',
}
const CONFIRM_BOOK_ACTIONS = {
  CONFIRM_BOOK_REQUEST: 'CONFIRM_BOOK_REQUEST',
  CONFIRM_BOOK_REQUEST_SUCCESS: 'CONFIRM_BOOK_REQUEST_SUCCESS',
  CONFIRM_BOOK_REQUEST_ERROR: 'CONFIRM_BOOK_REQUEST_ERROR'
}

const ACCEPT_OFFER_ACTIONS = {
  ACCEPT_OFFER_REQUEST: 'ACCEPT_OFFER_REQUEST',
  ACCEPT_OFFER_SUCCESS: 'ACCEPT_OFFER_SUCCESS',
  ACCEPT_OFFER_ERROR: 'ACCEPT_OFFER_ERROR',
  CLEAR_ACCEPT_SUCCESS_NOTIFICATINS: 'CLEAR_ACCEPT_SUCCESS_NOTIFICATINS',
  CLEAR_ACCEPT_NOTIFICATINS: 'CLEAR_ACCEPT_NOTIFICATINS'
}
const REJECT_OFFER_ACTIONS = {
  REJECT_OFFER_REQUEST: 'REJECT_OFFER_REQUEST',
  REJECT_OFFER_SUCCESS: 'REJECT_OFFER_SUCCESS',
  REJECT_OFFER_ERROR: 'REJECT_OFFER_ERROR',
  CLEAR_REJECT_SUCCESS_NOTIFICATINS: 'CLEAR_REJECT_SUCCESS_NOTIFICATINS',
  CLEAR_REJECT_NOTIFICATINS: 'CLEAR_REJECT_NOTIFICATINS'
}
const DELETE_OFFER_ACTIONS = {
  DELETE_OFFER_REQUEST: 'DELETE_OFFER_REQUEST',
  DELETE_OFFER_SUCCESS: 'DELETE_OFFER_SUCCESS',
  DELETE_OFFER_ERROR: 'DELETE_OFFER_ERROR',
  CLEAR_DELETE_SUCCESS_NOTIFICATINS: 'CLEAR_DELETE_SUCCESS_NOTIFICATINS',
  CLEAR_DELETE_NOTIFICATINS: 'CLEAR_DELETE_NOTIFICATINS'
}

const OFFERID_ACTIONS = {
  SEND_OFFERID_REQUEST: 'SEND_OFFERID_REQUEST',
  FETCH_OFFERID_SUCCESS: 'FETCH_OFFERID_SUCCESS',
  FETCH_OFFERID_ERROR: 'FETCH_OFFERID_ERROR',
  CLEAR_OFFERID_SUCCESS_NOTIFICATINS: 'CLEAR_OFFERID_SUCCESS_NOTIFICATINS',
  CLEAR_OFFERID_NOTIFICATINS: 'CLEAR_OFFERID_NOTIFICATINS'
}
const BOOKINGID_ACTIONS = {
  SEND_BOOKINGID_REQUEST: 'SEND_BOOKINGID_REQUEST',
  FETCH_BOOKINGID_SUCCESS: 'FETCH_BOOKINGID_SUCCESS',
  FETCH_BOOKINGID_ERROR: 'FETCH_BOOKINGID_ERROR',
  CLEAR_BOOKINGID_SUCCESS_NOTIFICATINS: 'CLEAR_OFFERID_SUCCESS_NOTIFICATINS',
  CLEAR_BOOKING_NOTIFICATINS: 'CLEAR_OFFERID_NOTIFICATINS'
}
const CANCELBOOKEDRIDE_ACTIONS = {
  SEND_CANCELBOOKEDRIDE_REQUEST: 'SEND_CANCELBOOKEDRIDE_REQUEST',
  FETCH_CANCELBOOKEDRIDE_SUCCESS: 'FETCH_CANCELBOOKEDRIDE_SUCCESS',
  FETCH_CANCELBOOKEDRIDE_ERROR: 'FETCH_CANCELBOOKEDRIDE_ERROR',
  CLEAR_CANCEL_NOTIFICATIONS: 'CLEAR_CANCEL_NOTIFICATIONS',
}
const LOCATION_SEACRCH_ACTIONS = {
  LOCATION_SEARCH_REQUEST: 'LOCATION_SEARCH_REQUEST',
  LOCATION_SEARCH_SUCCESS: 'LOCATION_SEARCH_SUCCESS,',
  LOCATION_SEARCH_ERROR: 'LOCATION_SEARCH_ERROR',
  CLEAR_LOCATION_SEARCH_NOTIFICATINS: 'CLEAR_LOCATION_SEARCH_NOTIFICATINS',
  CLEAR_LOCATION_SEARCH_SUCCESS_NOTIFICATINS: 'CLEAR_LOCATION_SEARCH_SUCCESS_NOTIFICATINS'
}
const RECENTRIDES_ACTIONS = {
  FETCH_RECENTRIDE_LISTS: 'FETCH_RECENTRIDE_LISTS',
  FETCH_RECENTRIDE_LISTS_SUCCESS: 'FETCH_RECENTRIDE_LISTS_SUCCESS',
  FETCH_RECENTRIDE_LISTS_ERROR: 'FETCH_RECENTRIDE_LISTS_ERROR',
  CLEAR_RECENT_RIDES_REDUCER: 'CLEAR_RECENT_RIDES_REDUCER',
}
const FEEDBACK_ACTIONS = {
  SEND_FEEDBACK_REQUEST: 'SEND_FEEDBACK_REQUEST',
  FETCH_FEEDBACK_SUCCESS: 'FETCH_FEEDBACK_SUCCESS',
  FETCH_FEEDBACK_ERROR: 'FETCH_FEEDBACK_ERROR',
  CLEAR_FEEDBACK_NOTIFICATINS: 'CLEAR_FEEDBACK_NOTIFICATINS',
  CLEAR_FEEDBACK_SUCCESS_NOTIFICATINS: 'CLEAR_FEEDBACK_SUCCESS_NOTIFICATINS'
}
const SHUTTLERIDES_ACTIONS = {
  FETCH_SHUTTLE_LISTS: 'FETCH_SHUTTLE_LISTS',
  FETCH_SHUTTLE_LISTS_SUCCESS: 'FETCH_SHUTTLE_LISTS_SUCCESS',
  FETCH_SHUTTLE_LISTS_ERROR: 'FETCH_SHUTTLE_LISTS_ERROR'
}
const MAXCOUNT_ACTIONS = {
  FETCH_COUNT: 'FETCH_COUNT',
  FETCH_COUNT_SUCCESS: 'FETCH_COUNT_SUCCESS',
  FETCH_COUNT_ERROR: 'FETCH_COUNT_ERROR',
}

const LDAP_SIGNUP_ACTIONS = {
  SEND_LDAP_SIGNUP_REQUEST: 'SEND_LDAP_SIGNUP_REQUEST',
  FETCH_LDAP_SIGNUP_SUCCESS: 'FETCH_LDAP_SIGNUP_SUCCESS',
  FETCH_LDAP_SIGNUP_ERROR: 'FETCH_LDAP_SIGNUP_ERROR',
  CLEAR_LDAP_SIGNUP_NOTIFICATIONS: 'CLEAR_LDAP_SIGNUP_NOTIFICATIONS',
}

const LDAP_LOGIN_ACTIONS = {
  SEND_LDAP_LOGIN_REQUEST: 'SEND_LDAP_LOGIN_REQUEST',
  FETCH_LDAP_LOGIN_SUCCESS: 'FETCH_LDAP_LOGIN_SUCCESS',
  FETCH_LDAP_LOGIN_ERROR: 'FETCH_LDAP_LOGIN_ERROR',
  CLEAR_LDAP_LOGIN_NOTIFICATIONS: 'CLEAR_LDAP_LOGIN_NOTIFICATIONS',
}

const YOUR_BOOKINGS_ACTIONS = {
  FETCH_YOUR_BOOKINGS_DATA: 'FETCH_YOUR_BOOKINGS_DATA',
  YOUR_BOOKINGS_DATA_SUCCESS: 'YOUR_BOOKINGS_DATA_SUCCESS',
  YOUR_BOOKINGS_DATA_ERROR: 'YOUR_BOOKINGS_DATA_ERROR',
  CLEAR_YOUR_BOOKINGS_NOTIFICATON: 'CLEAR_YOUR_BOOKINGS_NOTIFICATON',
}

const YOUR_OFFERED_RIDES_ACTIONS = {
  FETCH_YOUR_OFFERED_RIDES_DATA: 'FETCH_YOUR_OFFERED_RIDES_DATA',
  YOUR_OFFERED_RIDES_SUCCESS: 'YOUR_OFFERED_RIDES_SUCCESS',
  YOUR_OFFERED_RIDES_DATA_ERROR: 'YOUR_OFFERED_RIDES_DATA_ERROR',
  CLEAR_YOUR_OFFERED_RIDES_NOTIFICATON: 'CLEAR_YOUR_OFFERED_RIDES_NOTIFICATON',
}

const LDAP_ENABLED_ACTIONS = {
  FETCH_LDAP_ENABLED_REQUEST: 'FETCH_LDAP_ENABLED_REQUEST',
  FETCH_LDAP_ENABLED_SUCCESS: 'FETCH_LDAP_ENABLED_SUCCESS',
  FETCH_LDAP_ENABLED_ERROR: 'FETCH_LDAP_ENABLED_ERROR',
  CLEAR_LDAP_ENABLED_NOTIFICATIONS: 'CLEAR_LDAP_ENABLED_NOTIFICATIONS',
}

export default {
  ...APP_ACTIONS, ...LOCATION_SEACRCH_ACTIONS, ...DELETE_OFFER_ACTIONS, ...REJECT_OFFER_ACTIONS, ...OFFERID_ACTIONS, ...MESSAGE_ACTIONS, ...FINAL_REVIEWED_ACTIONS, ...SIGNUP_ACTIONS, ...BOOKRIDE_ACTIONS, ...PUBLISH_ACTIONS, ...ACCEPT_OFFER_ACTIONS, ...LOGIN_ACTIONS, ...CONFIRM_BOOK_ACTIONS, ...BOOKINGID_ACTIONS, ...CANCELBOOKEDRIDE_ACTIONS, ...RECENTRIDES_ACTIONS, ...FEEDBACK_ACTIONS, ...SHUTTLERIDES_ACTIONS, ...MAXCOUNT_ACTIONS, ...LDAP_SIGNUP_ACTIONS, ...LDAP_LOGIN_ACTIONS, ...YOUR_BOOKINGS_ACTIONS, ...YOUR_OFFERED_RIDES_ACTIONS, ...LDAP_ENABLED_ACTIONS,
};