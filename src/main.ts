import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// Styling
import './styles/style.scss'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(Buefy)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
