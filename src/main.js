
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Argon from "./plugins/argon-kit";
import axios from 'axios';
import VueAxios from 'vue-axios';
import './registerServiceWorker';
import './lib/jquery.vmap.rss.js';
import moment from 'moment';
//flot
import './lib/Flot/jquery.flot.js';
import './lib/Flot/jquery.flot.time.js';
import './lib/Flot/jquery.flot.resize.js';
import './lib/Flot/jquery.flot.dashes.js';

import vuetify from '@/plugins/vuetify' // path to vuetify export
import jvectormap from 'jvectormap';

window.$ = require('jquery');
window.jQuery = require('jquery');

moment.updateLocale('fr', {
  months :  ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  monthsShort: ['Janv.', 'Févr.', 'mars', 'avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.']
});
moment.localeData().longDateFormat('L');

Vue.config.productionTip = false;

Vue.config.productionTip = false;
Vue.use(Argon, VueAxios, axios, jvectormap);
Vue.prototype.$axios = axios;

export const bus = new Vue();

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
