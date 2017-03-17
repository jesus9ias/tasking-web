import storage from 'key-storage';
import http from '../utils/http';
//  import config from '../config';

const token = storage.get('token');

class TasksService {
  getAlltasks() {
    return http('GET', 'tasks', { token });
  }

  getOneTask(id) {
    return http('GET', `tasks/${id}`, { token });
  }

  updateTask(id, task) {
    return http('POST', `tasks/${id}`, { token, ...task });
  }

  saveTask(task) {
    return http('POST', 'tasks/save', { token, ...task });
  }

  completeTask(id) {
    return http('POST', `tasks/${id}/complete`, { token });
  }

  deleteTask(id) {
    return http('POST', `tasks/${id}/delete`, { token });
  }

  starTask(id) {
    return http('POST', `tasks/${id}/star`, { token });
  }


}

export default new TasksService();
