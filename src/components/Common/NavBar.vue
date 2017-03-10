<template>
  <md-toolbar>
    <md-button @click.native="$router.push('/')">
      <h1 class="md-title" style="flex: 1">Tasking</h1>
    </md-button>

    <md-button @click.native="$router.push('/tasks')">Tasks</md-button>

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

        <md-menu-item @click.native="$router.push('/logout')">
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
