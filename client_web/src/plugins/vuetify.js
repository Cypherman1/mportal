import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify, {
  icons: {
    iconfont: 'md' || 'fa'
  },
  theme: {
    primary: '#17a6b9',
    info: '#17a6b9'
  }
})

export default new Vuetify({
  icons: {
    iconfont: 'md' || 'fa'
  },
  theme: {
    themes: {
      light: {
        primary: '#8a1538',
        secondary: '#8a1538',
        accent: '#f4941e',
        error: '#FF5252',
        info: '#17a6b9',
        success: '#4CAF50',
        warning: '#FFC107'
      }
    }
  }
})
