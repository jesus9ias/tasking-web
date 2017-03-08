import storage from 'key-storage';
import http from '../utils/http';
//  import config from '../config';

class LoginService {
  isLogued() {
    const token = storage.get('token');
    return http('GET', 'isLogued', { token })
    .then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  }

  login(email, password) {
    return http('POST', 'login', { email, password })
    .then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  }
}

export default new LoginService();
