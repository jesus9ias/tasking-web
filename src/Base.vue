<template>
  <div id="base">
    <nav-bar />
    <router-view></router-view>
    <md-button @click.native="$router.push('/tasks/new')" class="md-fab md-fab-bottom-right">
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>

<script>
  import NavBar from './components/Common/navBar';

  export default {
    name: 'Base',
    components: {
      NavBar
    }
  };
</script>

<style>
  .md-fab.md-fab-bottom-right {
    position: fixed;
  }

  .section {
    padding: 70px 0px;
  }

  .md-title {
    padding: 0px 5px;
  }

  .card {
    margin: 10px 0px;
  }

  .text {
    margin: 5px;
  }
</style>
