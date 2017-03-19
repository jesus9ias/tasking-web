<template>
  <section class="section newTask">
    <def-task
      :task="task"
      :taskAction="updateTask"
      v-if="!isLoading && taskExists"
    />
    <p v-if="!isLoading && !taskExists">This task dosn't exists</p>
    <loading :isLoading="isLoading" />
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
      },
      isLoading: false,
      taskExists: true
    };
  },
  created() {
    this.loadTask();
  },
  methods: {
    loadTask() {
      this.isLoading = true;
      this.taskExists = true;
      TasksService.getOneTask(this.$route.params.id)
      .then((response) => {
        if (response.data.code === 200) {
          const { title, description, limitDate, priority, isRecurrent } = response.data.data.task;
          this.task.title = title;
          this.task.description = description;
          this.task.limitDate = moment(limitDate).format('YYYY-MM-DD');
          this.task.priority = priority;
          this.task.isRecurrent = Boolean(isRecurrent);
        } else {
          this.taskExists = false;
        }
        this.isLoading = false;
      }).catch((error) => {
        console.log(error);
        this.isLoading = false;
      });
    },
    updateTask() {
      TasksService.updateTask(this.$route.params.id, this.task)
      .then((response) => {
        if (response.data.code === 200) {
          this.$router.push('/tasks');
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  },
  watch: {
    $route: 'loadTask'
  },
  components: {
    DefTask
  }
};
</script>

<style scoped>

</style>
