<template>
  <section class="section home">
    <md-layout
      :md-gutter="16"
      class="fixGutter card"
      v-if="!isLoading"
    >
      <md-layout md-flex="100">
        <md-card class="md-flex">
          <md-card-header>

            <md-card-header-text>
              <div class="md-title">Tasking</div>
              <div class="md-subhead">Global Info</div>
            </md-card-header-text>
          </md-card-header>

          <md-card-content>
            <p>Active Tasks: {{homeInfo.activeTasks}}</p>
            <p>Completed Tasks: {{homeInfo.completedTasks}}</p>
            <p>Expired Tasks: {{homeInfo.expiredTasks}}</p>
          </md-card-content>
        </md-card>
      </md-layout>
    </md-layout>
    <loading :isLoading="isLoading" />
  </section>
</template>

<script>
import HomeService from '../../services/homeService';

export default {
  name: 'Home',
  data() {
    return {
      homeInfo: {},
      isLoading: false
    };
  },
  created() {
    this.loadInfo();
  },
  methods: {
    loadInfo() {
      this.isLoading = true;
      HomeService.getInfo()
      .then((response) => {
        this.homeInfo = {
          activeTasks: response.data.data.active.total,
          completedTasks: response.data.data.completed.total,
          expiredTasks: response.data.data.expired.total
        };
        this.isLoading = false;
      }, (error) => {
        console.log(error);
        this.isLoading = false;
      });
    }
  }
};
</script>

<style scoped>

</style>
