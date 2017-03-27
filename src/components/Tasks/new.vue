<template>
  <section class="section newTask">
    <def-task
      :task="task"
      :taskAction="saveTask"
      :isRequesting="isRequesting"
    />
  </section>
</template>

<script>
import TasksService from '../../services/tasksService';
import DefTask from './def';

export default {
  name: 'NewTask',
  data() {
    return {
      task: {
        title: '',
        description: '',
        limitDate: '',
        priority: 1,
        isRecurrent: false
      },
      isRequesting: false
    };
  },
  methods: {
    saveTask() {
      this.isRequesting = true;
      TasksService.saveTask(this.task)
      .then((response) => {
        if (response.data.code === 200) {
          this.$router.push('/tasks');
        } else {
          this.isRequesting = false;
        }
      }).catch((error) => {
        console.log(error);
        this.isRequesting = true;
      });
    }
  },
  components: {
    DefTask
  }
};
</script>

<style scoped>

</style>
