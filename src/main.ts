import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// Styling
import './styles/style.scss';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { IconDefinition, library } from '@fortawesome/fontawesome-svg-core';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

Vue.use(Buefy);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;
library.add(faChevronUp as IconDefinition, faChevronDown as IconDefinition);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
