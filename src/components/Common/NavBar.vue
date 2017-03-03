<template>
  <md-toolbar>
    <h1 class="md-title" style="flex: 1">Tasking</h1>

    <form style="flex: 1">
      <md-input-container md-inline>
        <label>Search</label>
        <md-input></md-input>
      </md-input-container>
    </form>

    <md-menu md-size="4" md-direction="bottom left">
      <md-button class="md-icon-button" md-menu-trigger>
        <md-icon>face</md-icon>
      </md-button>

      <md-menu-content>
        <md-menu-item @click.native="$router.push('/settings')">
          <span>Settings</span>
        </md-menu-item>

        <md-menu-item @click.native="$router.push('/login')">
          <span>Log Out</span>
        </md-menu-item>
      </md-menu-content>
    </md-menu>



  </md-toolbar>
</template>

<script>
export default {
  name: 'nav',
  data() {
    return {};
  }
};
</script>

<style scoped>

</style>
