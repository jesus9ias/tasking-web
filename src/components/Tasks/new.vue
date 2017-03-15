<template>
  <section class="newTask">
    <def-task :task="task" :taskAction="saveTask" />
  </section>
</template>

<script>
import TasksService from '../../services/tasksService';
import DefTask from './defTask';

export default {
  name: 'newTask',
  data() {
    return {
      task: {
        title: '',
        description: '',
        limitDate: '',
        priority: 1,
        isRecurrent: false
      }
    };
  },
  methods: {
    saveTask() {
      TasksService.saveTask(this.task)
      .then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    }
  },
  components: {
    DefTask
  }
};
</script>

<style scoped>

</style>
