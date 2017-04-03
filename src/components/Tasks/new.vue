<template>
  <section class="section newTask">
    <def-task
      :task="task"
      :taskAction="saveTask"
      :isRequesting="isRequesting"
    />
    <md-snackbar md-position="bottom center" ref="snackbar" md-duration="5000">
      <span>{{ errorMessage }}</span>
      <md-button class="md-accent" md-theme="light-blue" @click.native="$refs.snackbar.close()">Close</md-button>
    </md-snackbar>
  </section>
</template>

<script>
import moment from 'moment-timezone';
import errors from '../../utils/errors';
import TasksService from '../../services/tasksService';
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
        isRecurrent: false
      },
      isRequesting: false,
      errorMessage: ''
    };
  },
  methods: {
    saveTask() {
      this.isRequesting = true;
      TasksService.saveTask(this.task)
      .then((response) => {
        if (response.data.code === 200) {
          this.$router.push('/tasks');
        } else {
          this.openSnack(response.data.msg);
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
  components: {
    DefTask
  }
};
</script>

<style scoped>

</style>
