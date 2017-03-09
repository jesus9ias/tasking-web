import storage from 'key-storage';

export default function () {
  return storage.get('token');
}
