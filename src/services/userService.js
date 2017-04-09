import storage from 'key-storage';
import http from '../utils/http';

const token = storage.get('token');

class UserService {
  changePassword(params = {}) {
    return http('POST', 'changePassword', { token, ...params });
  }
}

export default new UserService();
