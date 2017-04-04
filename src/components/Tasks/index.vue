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
          v-for="(task, index) in starredTasks"
        />
        <p class="text" v-if="!areThereStarredTasks">There are no starred tasks</p>
      </md-layout>

      <md-layout :md-gutter="16" class="fixGutter">
        <h2 class="md-title">All Tasks</h2>
      </md-layout>
      <md-layout :md-gutter="16" class="fixGutter">
        <card
          :task="task"
          :key="index"
          v-for="(task, index) in normalTasks"
        />
        <p class="text" v-if="!areThereTasks">There are no tasks</p>
      </md-layout>
    </div>
    <loading :isLoading="isLoading" />
  </section>
</template>

<script>
import TasksService from '../../services/tasksService';
import logout from '../../utils/logout';
import Card from './card';

export default {
  name: 'Tasks',
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
      TasksService.getAlltasks()
      .then((response) => {
        this.tasks = response.data.data.tasks;
        this.isLoading = false;
      }).catch(() => {
        this.isLoading = false;
        logout();
      });
    }
  },
  computed: {
    starredTasks() {
      if (this.tasks) {
        return this.tasks.filter(task => task.starredToTask !== null);
      }
      return [];
    },
    normalTasks() {
      if (this.tasks) {
        return this.tasks.filter(task => task.starredToTask === null);
      }
      return [];
    },
    areThereStarredTasks() {
      return this.starredTasks.length > 0;
    },
    areThereTasks() {
      return this.normalTasks.length > 0;
    }
  },
  components: {
    Card
  }
};
</script>

<style scoped>
</style>
