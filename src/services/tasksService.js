import storage from 'key-storage';
import http from '../utils/http';
//  import config from '../config';

class TasksService {
  getAlltasks() {
    const token = storage.get('token');
    return http('GET', 'tasks', { token });
  }

  getOneTask(id) {
    const token = storage.get('token');
    return http('GET', `tasks/${id}`, { token });
  }
}

export default new TasksService();
