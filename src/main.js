import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMaterial from 'vue-material';
import App from './App';
import { routes, authorizeRoute } from './routes';

Vue.use(VueRouter);
Vue.use(VueMaterial);

const router = new VueRouter({ routes, history: true });
router.beforeEach(authorizeRoute());

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
