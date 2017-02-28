<template>
  <section class="newTask">
    <def-task :task="task" :taskAction="saveTask" />
  </section>
</template>

<script>
import DefTask from './defTask';

export default {
  name: 'newTask',
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
    saveTask() {}
  },
  components: {
    DefTask
  }
};
</script>

<style scoped>

</style>
