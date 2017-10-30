<template>
  <section class="section editTask">
    <def-task
      :task="task"
      :taskAction="updateTask"
      :isRequesting="isRequesting"
      actionText="Update"
      titleText="Edit Task"
      v-if="!isLoading && taskExists"
    />
    <p v-if="!isLoading && !taskExists">This task doesn't exists</p>
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
import logout from '../../utils/logout';
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
        isRecurrent: false,
        tagsToTask: []
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
          const {
            title,
            description,
            limitDate,
            priority,
            isRecurrent,
            tagsToTask
          } = response.data.data.task;
          this.task.title = title;
          this.task.description = description.replace(/<br \/>/g, '\n');
          this.task.limitDate = limitDate;
          this.task.priority = priority;
          this.task.isRecurrent = Boolean(isRecurrent);
          this.task.tagsToTask = tagsToTask;
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
      const task = {
        title: this.task.title,
        description: this.task.description.replace(/\n/g, '<br />'),
        limitDate: this.task.limitDate,
        priority: this.task.priority,
        isRecurrent: this.task.isRecurrent,
        tagsToTask: this.task.tagsToTask
      };
      TasksService.updateTask(this.$route.params.id, task)
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
        this.isRequesting = false;
        logout();
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
