import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth/index'
import app from './modules/app/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    auth,
    app
  }
})
