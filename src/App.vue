<template>
  <div id="app">
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

  .grid.md-gutter-16:not(.md-column) {
    margin: 0px;
  }
</style>
