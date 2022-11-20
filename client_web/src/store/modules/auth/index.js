import authMutations from './mutations'
import authGetters from './getters'
import authActions from './actions'

export default {
  namespaced: true,
  state: () => ({
    isAuthenticated: false,
    displayName: '',
    legalName: '',
    email: '',
    avatar: '',
    uid: '',
    loading: false,
    errorMessage: '',
    alert: false,
    profileDialog: false,
    changePasswdDialog: false,
    emailSent: ''
  }),
  mutations: authMutations,
  actions: authActions,
  getters: authGetters
}
