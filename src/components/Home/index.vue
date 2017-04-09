<template>
  <section class="section home">
    <md-layout
      class="fixGutter"
      md-align="center"
      :md-gutter="16"
      v-if="!isLoading"
    >
      <md-layout md-flex="50" md-flex-xsmall="100">
        <md-card class="md-flex">
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">Tasking</div>
              <div class="md-subhead">Global Info</div>
            </md-card-header-text>
          </md-card-header>

          <md-card-content>
            <p>Active Tasks: <b>{{homeInfo.activeTasks}}</b></p>
            <p>Completed Tasks: <b>{{homeInfo.completedTasks}}</b></p>
            <p>Expired Tasks: <b>{{homeInfo.expiredTasks}}</b></p>
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
      }, () => {
        this.isLoading = false;
      });
    }
  }
};
</script>

<style scoped>
  .home {
    padding: 75px 0px;
  }
</style>
