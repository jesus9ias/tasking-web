<template>
  <section class="section newTask">
    <def-task :task="task" :taskAction="updateTask" />
  </section>
</template>

<script>
import moment from 'moment';
import TasksService from '../../services/tasksService';
import DefTask from './def';

export default {
  name: 'editTask',
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
  created() {
    TasksService.getOneTask(this.$route.params.id)
    .then((response) => {
      const { title, description, limitDate, priority, isRecurrent } = response.data.data.task;
      this.task.title = title;
      this.task.description = description;
      this.task.limitDate = moment(limitDate).format('YYYY-MM-DD');
      this.task.priority = priority;
      this.task.isRecurrent = Boolean(isRecurrent);
    }).catch((error) => {
      console.log(error);
    });
  },
  methods: {
    updateTask() {
      TasksService.updateTask(this.$route.params.id, this.task)
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
