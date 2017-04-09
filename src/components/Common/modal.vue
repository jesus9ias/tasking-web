<template>
  <md-dialog ref="customDialog">
    <md-dialog-title v-if="title">
      {{ title }}
    </md-dialog-title>
    <md-dialog-content>
      <p>{{ message }}</p>
    </md-dialog-content>
    <md-dialog-actions>
      <md-button class="md-primary" @click.native="close">OK</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  export default {
    name: 'Modal',
    data() {
      return {
        title: null,
        message: 'no message'
      };
    },
    created() {
      global.eventHub.$on('showModal', (data) => {
        this.title = data.title;
        this.message = data.message;
        this.$refs.customDialog.open();
      });
    },
    methods: {
      close() {
        this.$refs.customDialog.close();
      }
    }
  };
</script>

<style>
</style>
