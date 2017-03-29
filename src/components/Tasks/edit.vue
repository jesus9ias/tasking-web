<template>
  <section class="section editTask">
    <def-task
      :task="task"
      :taskAction="updateTask"
      actionText="Update"
      v-if="!isLoading && taskExists"
      :isRequesting="isRequesting"
    />
    <p v-if="!isLoading && !taskExists">This task dosn't exists</p>
    <loading :isLoading="isLoading" />
    <md-snackbar md-position="bottom center" ref="snackbar" md-duration="5000">
      <span>{{ errorMessage }}</span>
      <md-button class="md-accent" md-theme="light-blue" @click.native="$refs.snackbar.close()">Close</md-button>
    </md-snackbar>
  </section>
</template>

<script>
import errors from '../../utils/errors';
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
      taskExists: true,
      errorMessage: ''
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
          if (response.data.code === 404) {
            this.openSnack('Task Not Found');
          } else {
            this.openSnack(response.data.msg);
          }
          this.taskExists = false;
        }
        this.isLoading = false;
      }).catch(() => {
        this.openSnack(errors(0));
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
          if (response.data.code === 404) {
            this.openSnack('Task Not Found');
          } else {
            this.openSnack(response.data.msg);
          }
          this.isRequesting = false;
        }
      }).catch(() => {
        this.openSnack(errors(0));
        this.isRequesting = false;
      });
    },
    openSnack(msg) {
      this.errorMessage = msg;
      this.$refs.snackbar.open();
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
