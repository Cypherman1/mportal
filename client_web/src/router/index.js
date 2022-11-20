import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../views/Auth.vue'

// import store from '@/store'
import AuthGuard from './auth-guard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: AuthGuard
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/profile/:uid',
    name: 'Profile',
    props: true,
    beforeEnter: AuthGuard,
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Profile.vue')
  },
  {
    path: '/myprofile/',
    name: 'MyProfile',

    beforeEnter: AuthGuard,
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/MyProfile.vue')
  },
  {
    path: '/rank',
    name: 'Rank',
    beforeEnter: AuthGuard,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Rank.vue')
  },
  {
    path: '/schedule',
    name: 'Schedule',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    beforeEnter: AuthGuard,
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Schedule.vue')
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

// router.beforeEach((to, from, next) => {
//   if (to.name !== 'Auth' && store.getters['auth/uid'] === '') {
//     next({ name: 'Auth' })
//   } else {
//     console.log(to)
//     next()
//   }
// })

export default router
