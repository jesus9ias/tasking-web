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

  updateTask(id, task) {
    const token = storage.get('token');
    return http('POST', `tasks/${id}`, { token, ...task });
  }

  saveTask(task) {
    const token = storage.get('token');
    return http('POST', 'tasks/save', { token, ...task });
  }

  completeTask(id) {
    const token = storage.get('token');
    return http('POST', `tasks/${id}/complete`, { token });
  }

  deleteTask(id) {
    const token = storage.get('token');
    return http('POST', `tasks/${id}/delete`, { token });
  }


}

export default new TasksService();
