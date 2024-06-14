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
        primary: '#004ea0',
        secondary: '#004ea0',
        accent: '#00a85d',
        error: '#FF5252',
        info: '#17a6b9',
        success: '#4CAF50',
        warning: '#FFC107'
      }
    }
  }
})
