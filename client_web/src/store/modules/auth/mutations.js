export default {
  SET_USER(state, payload) {
    state.uid = payload.uid
    state.displayName = payload.displayName
    state.avatar = payload.avatar
    state.email = payload.email
  },
  SET_DISPLAY_NAME(state, payload) {
    state.displayName = payload
  },
  SET_LEGAL_NAME(state, payload) {
    state.legalName = payload.legalName
    // state.isPaid = payload.isPaid
  },
  SET_CHANGEPASSWD_DIALOG(state, payload) {
    state.changePasswdDialog = payload
  },
  GET_LEGAL_NAME(state, payload) {
    state.legalName = payload
  },
  SET_PROFILE_DIALOG(state, payload) {
    state.profileDialog = payload
  },
  SET_AVATAR(state, payload) {
    state.avatar = payload
  },
  SET_LOADING(state, payload) {
    state.loading = payload
  },
  SET_SENT_EMAIL(state, payload) {
    state.emailSent = payload
  },
  SET_AUTH_ERR_MESSAGE(state, payload) {
    state.errorMessage = payload.errorMessage
    state.alert = payload.alert
  },
  CLOSE_AUTH_ERR_MESSAGE(state) {
    state.errorMessage = ''
    state.alert = false
  }
}
