import Vue from 'vue';
import VueMaterial from 'vue-material';
import App from './App';
import router from './router';

Vue.use(VueMaterial);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
