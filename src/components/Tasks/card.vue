<template>
  <md-layout
    md-flex="25"
    md-flex-medium="50"
    md-flex-xsmall="100"
  >
    <md-card class="md-flex card" :class="taskStatus" :md-theme="theme">
      <md-card-header>

        <md-card-header-text>
          <div class="md-title">{{ task.title }}</div>
          <div class="md-subhead">{{ dateFromNow(task.createdAt) }}</div>
          <div class="md-subhead">{{ priorities[task.priority] }}</div>
        </md-card-header-text>

        <md-button
          v-if="task.status===2"
          md-theme="stars"
          class="md-icon-button"
          :class="{'md-accent': task.starredToTask}"
          @click.native="startTask()"
        >
          <md-icon class="md-accent">star</md-icon>
        </md-button>

        <md-menu md-size="4" md-direction="bottom left">
          <md-button class="md-icon-button" md-menu-trigger>
            <md-icon>more_vert</md-icon>
          </md-button>

          <md-menu-content>
            <md-menu-item v-if="task.status===2" @click.native="$router.push('/tasks/' + task.id)">
              <span>Edit</span>
              <md-icon>mode_edit</md-icon>
            </md-menu-item>

            <md-menu-item v-if="task.status===2" @click.native="deleteTask()">
              <span>Delete</span>
              <md-icon>delete</md-icon>
            </md-menu-item>

            <md-menu-item v-if="task.status===2" @click.native="completeTask()">
              <span>Complete</span>
              <md-icon>done</md-icon>
            </md-menu-item>

            <md-menu-item v-if="task.status!==2" @click.native="reopenTask()">
              <span>Reopen</span>
              <md-icon>replay</md-icon>
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

const priorities = {
  1: 'Low',
  2: 'Medium',
  3: 'High',
  4: 'Extreme'
};

export default {
  name: 'TaskCard',
  data() {
    return {
      theme: '',
      priorities
    };
  },
  props: ['task'],
  methods: {
    dateFromNow(date) {
      return moment.tz(date, 'YYYY-MM-DDTHH:mm', 'America/Mexico_City').fromNow();
    },
    completeTask() {
      TasksService.completeTask(this.task.id)
      .then((response) => {
        if (response.data.code === 200) {
          this.task.status = 3;
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    deleteTask() {
      TasksService.deleteTask(this.task.id)
      .then((response) => {
        if (response.data.code === 200) {
          this.task.status = 4;
        }
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
    reopenTask() {
      TasksService.reopenTask(this.task.id)
      .then((response) => {
        if (response.data.code === 200) {
          this.task.status = 2;
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  },
  computed: {
    taskStatus() {
      this.theme = '';
      if (this.task.status === 2) {
        const currentDate = new Date();
        if (moment(currentDate).isAfter(this.task.limitDate, 'days')) {
          return 'md-accent';
        } else if (moment(currentDate).isSame(this.task.limitDate, 'days')) {
          return 'md-warn';
        }
      } else if (this.task.status === 3) {
        return 'md-primary';
      } else if (this.task.status === 4) {
        this.theme = 'cards';
        return 'md-primary';
      }
      return '';
    }
  }
};
</script>

<style scoped>
</style>
