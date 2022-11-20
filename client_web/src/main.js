import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import { auth } from '@/firebase.js'
import UUID from 'vue-uuid'

Vue.use(VueRouter)
Vue.use(UUID)

Vue.config.productionTip = false

store.dispatch('app/deleteUser')

auth.onAuthStateChanged((user) => {
  if (user) {
    store.dispatch('auth/autoSignIn', user)
    store.dispatch('auth/getAvatarUrl', user)
    store.dispatch('auth/getLegalName', { uid: user.uid })
  }
  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App)
  }).$mount('#app')
})
