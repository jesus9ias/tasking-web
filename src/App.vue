<template>
  <div id="app">
    <NavBar />
    <router-view></router-view>
    <md-button class="md-fab md-fab-bottom-right">
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>

<script>
  import NavBar from './components/Common/NavBar';

  export default {
    name: 'app',
    components: {
      NavBar
    }
  };
</script>

<style>
  @import '~vue-material/dist/vue-material.css';
</style>
