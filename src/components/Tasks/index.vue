<template>
  <section class="section tasks">
    <div v-if="!isLoading">
      <md-layout :md-gutter="16" class="fixGutter">
        <h2 class="md-title">Starred Tasks</h2>
      </md-layout>
      <md-layout :md-gutter="16" class="fixGutter">
        <card
          :task="task"
          :key="index"
          v-for="(task, index) in starredTasks(tasks)"
        />
      </md-layout>

      <md-layout :md-gutter="16" class="fixGutter">
        <h2 class="md-title">All Tasks</h2>
      </md-layout>
      <md-layout :md-gutter="16" class="fixGutter">
        <card
          :task="task"
          :key="index"
          v-for="(task, index) in normalTasks(tasks)"
        />
      </md-layout>
    </div>
    <loading :isLoading="isLoading" />
  </section>
</template>

<script>
import TasksService from '../../services/tasksService';
import Card from './card';

export default {
  name: 'tasks',
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
    starredTasks(tasks) {
      if (tasks) {
        return tasks.filter(task => task.starredToTask !== null);
      }
      return [];
    },
    normalTasks(tasks) {
      if (tasks) {
        return tasks.filter(task => task.starredToTask === null);
      }
      return [];
    },
    loadTasks() {
      this.isLoading = true;
      TasksService.getAlltasks()
      .then((response) => {
        this.tasks = response.data.data.tasks;
        this.isLoading = false;
      }).catch((error) => {
        console.log(error);
        this.isLoading = false;
      });
    }
  },
  components: {
    Card
  }
};
</script>

<style scoped>
</style>
