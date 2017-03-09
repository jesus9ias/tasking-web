import storage from 'key-storage';
import http from '../utils/http';
//  import config from '../config';

class LoginService {
  isLogued() {
    const token = storage.get('token');
    return http('GET', 'isLogued', { token });
  }

  login(email, password) {
    return http('POST', 'login', { email, password });
  }
}

export default new LoginService();
