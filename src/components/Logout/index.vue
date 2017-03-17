<template>
  <section class="section logout">
    <md-spinner :md-size="150" md-indeterminate></md-spinner>
  </section>
</template>

<script>
import storage from 'key-storage';
import LoginService from '../../services/loginService';

export default {
  name: 'logout',
  created() {
    LoginService.logout()
    .then((response) => {
      if (response.data.code === 200) {
        storage.remove('token');
        document.location.href = '/';
      }
    }).catch((error) => {
      console.log(error);
    });
  }
};
</script>

<style scoped>
</style>
