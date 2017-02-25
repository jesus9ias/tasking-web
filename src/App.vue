<template>
  <div id="app">
    <md-toolbar>
      <h1 class="md-title">Tasking</h1>
    </md-toolbar>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  };
</script>

<style>
  @import '~vue-material/dist/vue-material.css';
</style>
