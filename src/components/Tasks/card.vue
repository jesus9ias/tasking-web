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
          v-if="task.status === 2"
          md-theme="stars"
          class="md-icon-button"
          :class="{ 'md-accent': task.starredToTask }"
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

      <md-card-content class="descriptionBlock">
        {{ replaceBreak(task.description )}}
      </md-card-content>

      <md-card-content v-if="tooMuchText">
        <md-button @click.native="showAllDescription" class="md-icon-button md-primary md-raised md-dense">
          <md-icon v-if="!isShownAllDescription">expand_more</md-icon>
          <md-icon v-if="isShownAllDescription">expand_less</md-icon>
        </md-button>
      </md-card-content>

      <md-card-content class="descriptionBlock">
        <md-chips v-model="tags" md-static></md-chips>
      </md-card-content>

      <md-card-content>
        <h3 class="md-subheading">Expiration</h3>
        <div class="md-subhead">{{ dateFromNow(task.limitDate) }}</div>
      </md-card-content>
    </md-card>
  </md-layout>
</template>

<script>
import storage from 'key-storage';
import moment from 'moment';
import logout from '../../utils/logout';
import TasksService from '../../services/tasksService';

const priorities = {
  1: 'Low',
  2: 'Medium',
  3: 'High',
  4: 'Extreme'
};

const parseStorage = (val) => {
  if (val === 'true' || val === true) {
    return true;
  }
  return false;
};

export default {
  name: 'TaskCard',
  data() {
    return {
      theme: '',
      priorities,
      showRelativeDates: parseStorage(storage.get('showRelativeDates')),
      isShownAllDescription: false,
      tags: ['Orange', 'Apple', 'Pineapple']
    };
  },
  methods: {
    dateFromNow(date) {
      if (this.showRelativeDates) {
        return moment.tz(date, 'YYYY-MM-DDTHH:mm', 'America/Mexico_City').fromNow();
      }
      return moment.tz(date, 'YYYY-MM-DDTHH:mm', 'America/Mexico_City').format('YYYY-MM-DD HH:mm');
    },
    completeTask() {
      TasksService.completeTask(this.task.id)
      .then((response) => {
        if (response.data.code === 200) {
          this.task.status = 3;
        }
      }).catch(() => {
        logout();
      });
    },
    deleteTask() {
      TasksService.deleteTask(this.task.id)
      .then((response) => {
        if (response.data.code === 200) {
          this.task.status = 4;
        }
      }).catch(() => {
        logout();
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
      }).catch(() => {
        logout();
      });
    },
    reopenTask() {
      TasksService.reopenTask(this.task.id)
      .then((response) => {
        if (response.data.code === 200) {
          this.task.status = 2;
        }
      }).catch(() => {
        logout();
      });
    },
    replaceBreak(description) {
      if (description.length <= 100 || this.isShownAllDescription) {
        return description.replace(/<br \/>/g, ' ');
      }
      return description.replace(/<br \/>/g, ' ').substring(0, 100);
    },
    showAllDescription() {
      this.isShownAllDescription = !this.isShownAllDescription;
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
    },
    tooMuchText() {
      return this.task.description.length > 100;
    }
  },
  props: {
    task: Object
  }
};
</script>

<style scoped>
.md-card-content {
  word-break: break-all;
}
.descriptionBlock {
  max-height: 120px;
  overflow-y: auto;
}
</style>
