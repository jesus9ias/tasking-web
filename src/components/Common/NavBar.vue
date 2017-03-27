<template>
  <md-whiteframe md-tag="md-toolbar" class="toolbar" md-elevation="2">
    <div class="md-toolbar-container">
      <md-menu
        md-size="4"
        md-direction="bottom right"
        md-offset-y="60"
        v-if="isMobile"
      >
        <md-button class="md-icon-button" md-menu-trigger>
          <md-icon>more_vert</md-icon>
        </md-button>

        <md-menu-content>
          <md-menu-item @click.native="$router.push('/tasks')">
            <span>Tasks</span>
          </md-menu-item>
          <md-menu-item @click.native="$router.push('/tasks/all')">
            <span>History</span>
          </md-menu-item>
        </md-menu-content>
      </md-menu>

      <md-button @click.native="$router.push('/')">
        <h1 class="md-title" style="flex: 1">Tasking</h1>
      </md-button>

      <div v-if="!isMobile">
        <md-button @click.native="$router.push('/tasks')">Tasks</md-button>
      </div>

      <div v-if="!isMobile">
        <md-button @click.native="$router.push('/tasks/all')">History</md-button>
      </div>

      <div class="navButtonsRight">

        <md-menu
          md-size="4"
          md-direction="bottom left"
          md-offset-y="60"
        >
          <md-button class="md-icon-button nav-button" md-menu-trigger>
            <md-icon>face</md-icon>
          </md-button>

          <md-menu-content>
            <md-menu-item @click.native="$router.push('/logout')">
              <span>Log Out</span>
            </md-menu-item>
          </md-menu-content>
        </md-menu>
      </div>
    </div>
  </md-whiteframe>
</template>

<script>
import { isMobile } from '../../utils/isMobile';

export default {
  name: 'Nav',
  data() {
    return {
      isMobile
    };
  }
};
</script>

<style scoped>
  .md-toolbar {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    z-index: 5;
  }

  .navButtonsRight {
    display: flex;
    flex: 1;
    justify-content: flex-end;
  }

  .nav-button {
    height: 100%;
  }
</style>
