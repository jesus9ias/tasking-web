<template>
  <section class="section tasks">
    <div v-if="!isLoading">
      <md-layout :md-gutter="16" class="fixGutter">
        <h2 class="md-title">All Tasks</h2>
      </md-layout>
      <md-layout :md-gutter="16" class="fixGutter">
        <card
          :task="task"
          :key="index"
          v-for="(task, index) in tasks"
        />
        <p class="text" v-if="!areThereTasks">There are no tasks</p>
      </md-layout>
    </div>
    <loading :isLoading="isLoading" />
  </section>
</template>

<script>
import TasksService from '../../services/tasksService';
import Card from './card';

export default {
  name: 'AllTasks',
  data() {
    return {
      tasks: [],
      isLoading: false
    };
  },
  created() {
    this.loadTasks();
  },
  methods: {
    loadTasks() {
      this.isLoading = true;
      TasksService.getAlltasks({ status: '2,3,4' })
      .then((response) => {
        this.tasks = response.data.data.tasks;
        this.isLoading = false;
      }).catch((error) => {
        console.log(error);
        this.isLoading = false;
      });
    }
  },
  computed: {
    areThereTasks() {
      return this.tasks.length > 0;
    }
  },
  components: {
    Card
  }
};
</script>

<style scoped>

</style>
