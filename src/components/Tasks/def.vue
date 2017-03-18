<template>
  <md-layout :md-gutter="16" class="fixGutter">
    <md-layout md-flex="100">
      <form class="md-flex" novalidate @submit.stop.prevent="action">
        <md-input-container>
          <label>Title</label>
          <md-input v-model="task.title"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Description</label>
          <md-textarea maxlength="70" v-model="task.description"></md-textarea>
        </md-input-container>
        <md-input-container>
          <label>Limit Date</label>
          <md-input type="date" v-model="task.limitDate"></md-input>
        </md-input-container>
        <md-input-container>
          <label for="priority">Priority</label>
          <md-select id="priority" v-model="task.priority">
            <md-option value="1">Low</md-option>
            <md-option value="2">Medium</md-option>
            <md-option value="3">Hign</md-option>
            <md-option value="4">Extrem</md-option>
          </md-select>
        </md-input-container>
        <md-layout>
          <md-switch v-model="task.isRecurrent" class="md-primary">Tarea Recurrente</md-switch>

          <div v-if="task.recurrent">
            <md-button-toggle class="md-warn">
              <md-button class="md-toggle">S</md-button>
              <md-button class="md-toggle">M</md-button>
              <md-button class="md-toggle">T</md-button>
              <md-button class="md-toggle">W</md-button>
              <md-button class="md-toggle">T</md-button>
              <md-button class="md-toggle">F</md-button>
              <md-button class="md-toggle">S</md-button>
            </md-button-toggle>
          </div>
        </md-layout>
        <md-button type="submit" class="md-raised md-primary">Save</md-button>
      </form>
    </md-layout>
  </md-layout>
</template>

<script>
export default {
  name: 'defTask',
  data() {
    return {};
  },
  methods: {
    action() {
      this.taskAction();
    }
  },
  props: [
    'task',
    'taskAction'
  ]
};
</script>

<style scoped>

</style>
