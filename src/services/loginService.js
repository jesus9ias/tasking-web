import storage from 'key-storage';
import http from '../utils/http';

const token = storage.get('token');

class LoginService {
  isLogued() {
    return http('GET', 'isLogued', { token });
  }

  login(email, password) {
    return http('POST', 'login', { email, password });
  }

  logout() {
    return http('POST', 'logout', { token });
  }
}

export default new LoginService();
