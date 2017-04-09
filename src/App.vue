<template>
  <div id="app">
    <modal />
    <router-view></router-view>
  </div>
</template>

<script>
  import Modal from './components/Common/modal';
  
  export default {
    name: 'App',
    components: {
      Modal
    }
  };
</script>

<style>
  @import '~vue-material/dist/vue-material.css';

  .fixGutter.md-gutter-16:not(.md-column) {
    margin-left: 0px;
    margin-right: 0px;
  }
</style>
