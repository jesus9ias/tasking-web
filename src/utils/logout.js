import storage from 'key-storage';

export default function () {
  storage.remove('token');
  global.router.push('/login');
}
