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

  .fixGutter.md-gutter-16:not(.md-column) {
    margin-left: 0px;
    margin-right: 0px;
  }
</style>
