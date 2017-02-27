import Vue from 'vue';
import Router from 'vue-router';
import Base from '@/Base';
import Home from '@/components/Home';
import Calendar from '@/components/Calendar';
import Tasks from '@/components/Tasks';
import EditTask from '@/components/Tasks/edit';
import NewTask from '@/components/Tasks/new';
import Login from '@/components/Login';
import Settings from '@/components/Settings';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Base,
      children: [
        { path: '', name: 'Home', component: Home },
        { path: 'calendar', name: 'Calendar', component: Calendar },
        { path: 'tasks', name: 'Tasks', component: Tasks },
        { path: 'tasks/new', name: 'NewTask', component: NewTask },
        { path: 'tasks/:id', name: 'EditTask', component: EditTask },
        { path: 'settings', name: 'Settings', component: Settings }
      ]
    },
    { path: '/login', name: 'Login', component: Login }
  ]
});
