<template>
  <section class="section newTask">
    <def-task
      :task="task"
      :taskAction="saveTask"
      :isRequesting="isRequesting"
      titleText="Create Task"
    />
    <md-snackbar md-position="bottom center" ref="snackbar" md-duration="5000">
      <span>{{ errorMessage }}</span>
      <md-button class="md-accent" md-theme="light-blue" @click.native="$refs.snackbar.close()">Close</md-button>
    </md-snackbar>
  </section>
</template>

<script>
import moment from 'moment-timezone';
import TasksService from '../../services/tasksService';
import logout from '../../utils/logout';
import DefTask from './def';

export default {
  name: 'NewTask',
  data() {
    return {
      task: {
        title: '',
        description: '',
        limitDate: moment.tz('America/Mexico_City').format('YYYY-MM-DDTHH:mm'),
        priority: 1,
        isRecurrent: false,
        tagsToTask: []
      },
      isRequesting: false,
      errorMessage: ''
    };
  },
  methods: {
    saveTask() {
      this.isRequesting = true;
      const newTask = {
        title: this.task.title,
        description: this.task.description.replace(/\n/g, '<br />'),
        limitDate: this.task.limitDate,
        priority: this.task.priority,
        isRecurrent: this.task.isRecurrent,
        tagsToTask: this.task.tagsToTask
      };
      TasksService.saveTask(newTask)
      .then((response) => {
        if (response.data.code === 200) {
          this.$router.push('/tasks');
        } else {
          this.openSnack(response.data.msg);
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
  components: {
    DefTask
  }
};
</script>

<style scoped>

</style>
