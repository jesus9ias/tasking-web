<template>
  <md-button class="md-raised md-primary" disabled v-if="show">
    <md-spinner :md-size="20" md-indeterminate></md-spinner>
  </md-button>
</template>

<script>

export default {
  name: 'LoadingButton',
  data() {
    return {};
  },
  props: {
    show: Boolean
  }
};
</script>

<style scoped>
  .md-spinner {
    vertical-align: middle;
  }
</style>
