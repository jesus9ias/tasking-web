<template>
  <loading :isLoading="true" />
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
