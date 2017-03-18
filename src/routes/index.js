import Base from '@/Base';
import Home from '@/components/Home';
import Calendar from '@/components/Calendar';
import Graphs from '@/components/Graphs';
import Tasks from '@/components/Tasks';
import EditTask from '@/components/Tasks/edit';
import NewTask from '@/components/Tasks/new';
import AllTasks from '@/components/Tasks/all';
import Login from '@/components/Login';
import Logout from '@/components/Logout';
import Settings from '@/components/Settings';
import auth from '../utils/auth';

export const routes = [
  {
    path: '/',
    component: Base,
    children: [
      { path: '', name: 'Home', component: Home },
      { path: 'calendar', name: 'Calendar', component: Calendar },
      { path: 'graphs', name: 'Graphs', component: Graphs },
      { path: 'tasks', name: 'Tasks', component: Tasks },
      { path: 'tasks/all', name: 'AllTasks', component: AllTasks },
      { path: 'tasks/new', name: 'NewTask', component: NewTask },
      { path: 'tasks/:id', name: 'EditTask', component: EditTask },
      { path: 'settings', name: 'Settings', component: Settings }
    ]
  },
  { path: '/login', name: 'Login', component: Login },
  { path: '/logout', name: 'Logout', component: Logout }
];

export function authorizeRoute() {
  return (to, from, next) => {
    if (to.name !== 'Login' && !auth()) {
      next({
        path: '/login'
      });
    } else if (to.name === 'Login' && auth()) {
      next({
        path: '/'
      });
    } else {
      next();
    }
  };
}
