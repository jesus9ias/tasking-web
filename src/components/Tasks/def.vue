<template>
  <md-layout :md-gutter="16" class="fixGutter">
    <md-layout md-flex="100">
      <form class="md-flex" novalidate @submit.stop.prevent="action">
        <md-input-container>
          <label>Title</label>
          <md-input v-model="task.title" />
        </md-input-container>
        <md-input-container>
          <label>Description</label>
          <md-textarea maxlength="70" v-model="task.description" />
        </md-input-container>
        <md-input-container>
          <label>Limit Date</label>
          <md-input type="datetime-local" v-model="task.limitDate" />
        </md-input-container>
        <md-input-container>
          <label for="priority">Priority</label>
          <md-select id="priority" v-model="task.priority">
            <md-option v-bind:value="1">Low</md-option>
            <md-option v-bind:value="2">Medium</md-option>
            <md-option v-bind:value="3">Hign</md-option>
            <md-option v-bind:value="4">Extreme</md-option>
          </md-select>
        </md-input-container>
        <md-button type="submit" class="md-raised md-primary" v-if="!isRequesting">Save</md-button>
        <loading-button :show="isRequesting" />
      </form>
    </md-layout>
  </md-layout>
</template>

<script>
export default {
  name: 'DefTask',
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
    'taskAction',
    'isRequesting'
  ]
};
</script>

<style scoped>

</style>
