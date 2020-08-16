import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './style/global.scss';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';



library.add(faUserSecret);
import "font-awesome/css/font-awesome.min.css";
Vue.component('VueFontawesome', require('vue-fontawesome-icon/VueFontawesome.vue').default);
// Install BootstrapVue
Vue.use(BootstrapVue);

// Install BootstrapVue icon
Vue.use(IconsPlugin)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
