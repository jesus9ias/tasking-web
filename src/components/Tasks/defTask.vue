<template>
  <form novalidate @submit.stop.prevent="action">
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
      <md-input type="date" v-model="task.dateLimit"></md-input>
    </md-input-container>
    <md-button type="submit" class="md-raised md-primary">Save</md-button>
  </form>
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
