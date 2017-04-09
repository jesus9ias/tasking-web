import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMaterial from 'vue-material';
import App from './App';
import { routes, authorizeRoute } from './routes';
import Loading from './components/Common/loading';
import LoadingButton from './components/Common/loadingButton';

Vue.use(VueRouter);
Vue.use(VueMaterial);

Vue.component('Loading', Loading);
Vue.component('LoadingButton', LoadingButton);

Vue.material.registerTheme('cards', {
  primary: 'grey',
  accent: 'red',
  warn: 'yellow',
  background: 'white'
});

Vue.material.registerTheme('stars', {
  primary: 'lime',
  accent: 'light-blue',
  warn: 'lime',
  background: 'lime'
});

global.router = new VueRouter({ routes, history: true });
global.router.beforeEach(authorizeRoute());
global.eventHub = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: global.router,
  template: '<App/>',
  components: { App }
});
