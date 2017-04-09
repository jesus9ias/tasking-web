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
  import storage from 'key-storage';
  import LoginService from './services/loginService';
  import NavBar from './components/Common/navBar';

  export default {
    name: 'Base',
    created() {
      this.checkSession();
    },
    methods: {
      checkSession() {
        LoginService.checkSession()
        .then((response) => {
          if (response.data.code !== 200) {
            this.logout();
          }
        }, () => {
          this.logout();
        });
      },
      logout() {
        storage.remove('token');
        this.$router.push('/login');
      }
    },
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

  .text {
    margin: 5px;
  }
</style>
