<template>
  <section class="newTask">
    <def-task :task="task" :taskAction="updateTask" />
  </section>
</template>

<script>
import DefTask from './defTask';

export default {
  name: 'editTask',
  data() {
    return {
      task: {
        title: '',
        description: '',
        dateLimit: ''
      }
    };
  },
  methods: {
    updateTask() {}
  },
  components: {
    DefTask
  }
};
</script>

<style scoped>

</style>
