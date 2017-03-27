<template>
  <section class="section logout">
    <md-spinner :md-size="150" md-indeterminate />
  </section>
</template>

<script>
import storage from 'key-storage';

export default {
  name: 'Logout',
  created() {
    storage.remove('token');
    document.location.href = '/';
  }
};
</script>

<style scoped>
</style>
