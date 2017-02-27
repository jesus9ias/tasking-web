<template>
  <div id="base">
    <NavBar />
    <router-view></router-view>
    <router-link to="/tasks/new">
      <md-button class="md-fab md-fab-bottom-right">
        <md-icon>add</md-icon>
      </md-button>
    </router-link>
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
</style>
