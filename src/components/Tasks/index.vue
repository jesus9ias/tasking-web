<template>
  <section class="tasks">

    <md-layout :md-gutter="16" class="fixGutter">
      <md-layout class="task__block" md-flex="25"  md-flex-medium="50" md-flex-xsmall="100" v-for="(task, index) in tasks" :key="index">
        <md-card class="md-flex task">
          <md-card-header>

            <md-card-header-text>
              <div class="md-title">{{ task.title }}</div>
              <div class="md-subhead">{{ dateFromNow(task.createdAt) }}</div>
            </md-card-header-text>

            <md-button class="md-icon-button">
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

                <md-menu-item @click.native="deleteTask(task.id)">
                  <span>Delete</span>
                  <md-icon>delete</md-icon>
                </md-menu-item>

                <md-menu-item @click.native="completeTask(task.id)">
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
            <div class="md-subhead">Into 15 hours</div>
          </md-card-content>
        </md-card>
      </md-layout>

    </md-layout>

  </section>
</template>

<script>
import moment from 'moment';
import TasksService from '../../services/tasksService';

export default {
  name: 'tasks',
  data() {
    return {
      tasks: []
    };
  },
  created() {
    TasksService.getAlltasks()
    .then((response) => {
      this.tasks = response.data.data.tasks;
    }).catch((error) => {
      console.log(error);
    });
  },
  methods: {
    dateFromNow(date) {
      return moment(date).fromNow();
    },
    completeTask(id) {
      TasksService.completeTask(id)
      .then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    },
    deleteTask(id) {
      TasksService.deleteTask(id)
      .then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    }
  }
};
</script>

<style scoped>
  /*.task__block {
    margin: 10px 0px;
  }*/

  .task {
    margin: 10px 0px;
  }
</style>
