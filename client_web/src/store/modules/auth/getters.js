export default {
  displayName: (state) => state.displayName,
  legalName: (state) => state.legalName,
  email: (state) => state.email,
  avatar: (state) => state.avatar,
  isAuthenticated: (state) => state.isAuthenticated,
  uid: (state) => state.uid,
  loading: (state) => state.loading,
  errorMessage: (state) => state.errorMessage,
  alert: (state) => state.alert,
  profileDialog: (state) => state.profileDialog,
  changePasswdDialog: (state) => state.changePasswdDialog,
  emailSent: (state) => state.emailSent
}
