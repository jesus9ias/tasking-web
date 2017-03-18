<template>
  <section class="section tasks">
    <md-layout :md-gutter="16" class="fixGutter">
      <h2 class="md-title">All Tasks</h2>
    </md-layout>
    <md-layout :md-gutter="16" class="fixGutter">
      <card
        :task="task"
        :key="index"
        v-for="(task, index) in tasks"
      />
    </md-layout>
  </section>
</template>

<script>
import TasksService from '../../services/tasksService';
import Card from './card';

export default {
  name: 'allTasks',
  data() {
    return {
      tasks: []
    };
  },
  created() {
    TasksService.getAlltasks({ status: '2,3,4' })
    .then((response) => {
      this.tasks = response.data.data.tasks;
    }).catch((error) => {
      console.log(error);
    });
  },
  components: {
    Card
  }
};
</script>

<style scoped>

</style>
