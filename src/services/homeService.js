import storage from 'key-storage';
import http from '../utils/http';

const token = storage.get('token');

class HomeService {
  getInfo() {
    return http('GET', '', { token });
  }
}

export default new HomeService();
