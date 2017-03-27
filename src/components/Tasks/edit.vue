<template>
  <section class="section editTask">
    <def-task
      :task="task"
      :taskAction="updateTask"
      v-if="!isLoading && taskExists"
      :isRequesting="isRequesting"
    />
    <p v-if="!isLoading && !taskExists">This task dosn't exists</p>
    <loading :isLoading="isLoading" />
  </section>
</template>

<script>
import TasksService from '../../services/tasksService';
import DefTask from './def';

export default {
  name: 'EditTask',
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
      isRequesting: false,
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
          this.task.limitDate = limitDate;
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
      this.isRequesting = true;
      TasksService.updateTask(this.$route.params.id, this.task)
      .then((response) => {
        if (response.data.code === 200) {
          this.$router.push('/tasks');
        } else {
          this.isRequesting = false;
        }
      }).catch((error) => {
        console.log(error);
        this.isRequesting = false;
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
