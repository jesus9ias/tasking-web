<template>
  <div class="center" v-if="isLoading">
    <md-spinner :md-size="150" md-indeterminate></md-spinner>
  </div>
</template>

<script>

export default {
  name: 'loading',
  data() {
    return {};
  },
  props: {
    isLoading: Boolean
  }
};
</script>

<style scoped>
  .center {
    text-align: center;
  }
</style>
