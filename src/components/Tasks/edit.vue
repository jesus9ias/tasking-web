<template>
  <section class="newTask">
    <def-task :task="task" :taskAction="updateTask" />
  </section>
</template>

<script>
//  import moment from 'moment';
import TasksService from '../../services/tasksService';
import DefTask from './defTask';

export default {
  name: 'editTask',
  data() {
    return {
      task: {
        title: '',
        description: '',
        dateLimit: '',
        priority: 1,
        recurrent: false
      }
    };
  },
  created() {
    TasksService.getOneTask(this.$route.params.id)
    .then((response) => {
      this.task = response.data.data.task;
    }).catch((error) => {
      console.log(error);
    });
    console.log(this.$route.params.id);
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
