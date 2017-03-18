<template>
  <md-layout
    class="task__block"
    md-flex="25"
    md-flex-medium="50"
    md-flex-xsmall="100"
  >
    <md-card class="md-flex task" :class="taskStatus(task)">
      <md-card-header>

        <md-card-header-text>
          <div class="md-title">{{ task.title }}</div>
          <div class="md-subhead">{{ dateFromNow(task.createdAt) }}</div>
        </md-card-header-text>

        <md-button
          class="md-icon-button"
          :class="{'md-accent': task.starredToTask}"
          @click.native="startTask()"
        >
          <md-icon class="md-primary">star</md-icon>
        </md-button>

        <md-menu md-size="4" md-direction="bottom left">
          <md-button class="md-icon-button" md-menu-trigger>
            <md-icon>more_vert</md-icon>
          </md-button>

          <md-menu-content>
            <md-menu-item @click.native="$router.push('/tasks/' + task.id)">
              <span>Edit</span>
              <md-icon>mode_edit</md-icon>
            </md-menu-item>

            <md-menu-item @click.native="deleteTask()">
              <span>Delete</span>
              <md-icon>delete</md-icon>
            </md-menu-item>

            <md-menu-item @click.native="completeTask()">
              <span>Complete</span>
              <md-icon>done</md-icon>
            </md-menu-item>
          </md-menu-content>
        </md-menu>
      </md-card-header>

      <md-card-content>
        {{ task.description }}
      </md-card-content>

      <md-card-content>
        <h3 class="md-subheading">Expiration</h3>
        <div class="md-subhead">{{ dateFromNow(task.limitDate) }}</div>
      </md-card-content>
    </md-card>
  </md-layout>
</template>

<script>
import moment from 'moment';
import TasksService from '../../services/tasksService';

export default {
  name: 'taskCard',
  data() {
    return {};
  },
  props: ['task'],
  methods: {
    dateFromNow(date) {
      return moment(date).fromNow();
    },
    completeTask() {
      TasksService.completeTask(this.task.id)
      .then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    },
    deleteTask() {
      TasksService.deleteTask(this.task.id)
      .then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    },
    startTask() {
      TasksService.starTask(this.task.id)
      .then((response) => {
        if (response.data.data.id) {
          this.task.starredToTask = true;
        } else {
          this.task.starredToTask = null;
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    taskStatus(task) {
      const currentDate = new Date();
      if (moment(currentDate).isAfter(task.limitDate, 'days')) {
        return 'md-accent';
      } else if (moment(currentDate).isSame(task.limitDate, 'days')) {
        return 'md-warn';
      }
      return '';
    }
  }
};
</script>

<style scoped>
  .task {
    margin: 10px 0px;
  }
</style>
