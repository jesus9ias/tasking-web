<template>
  <div id="base">
    <NavBar />
    <router-view></router-view>
    <md-button @click.native="$router.push('/tasks/new')" class="md-fab md-fab-bottom-right">
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>

<script>
  import NavBar from './components/Common/NavBar';

  export default {
    name: 'base',
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
    padding: 64px 0px;
  }

  .md-title {
    padding: 0px 5px;
  }

  .card {
    margin: 10px 0px;
  }
</style>
