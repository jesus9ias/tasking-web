<template>
  <section class="tasks">

    <md-layout :md-gutter="16" class="fixGutter">
      <md-layout class="task__block" md-flex="25" md-flex-xsmall="100" md-flex-medium="50">
        <md-card>
          <md-card-header>

            <md-card-header-text>
              <div class="md-title">Simple Task</div>
              <div class="md-subhead">20 hours ago</div>
            </md-card-header-text>

            <md-button class="md-icon-button">
              <md-icon class="md-primary">star</md-icon>
            </md-button>

            <md-menu md-size="4" md-direction="bottom left">
              <md-button class="md-icon-button" md-menu-trigger>
                <md-icon>more_vert</md-icon>
              </md-button>

              <md-menu-content>
                <md-menu-item>
                  <span>Edit</span>
                  <md-icon>mode_edit</md-icon>
                </md-menu-item>

                <md-menu-item>
                  <span>Delete</span>
                  <md-icon>delete</md-icon>
                </md-menu-item>

                <md-menu-item>
                  <span>Complete</span>
                  <md-icon>done</md-icon>
                </md-menu-item>
              </md-menu-content>
            </md-menu>
          </md-card-header>

          <md-card-content>
            This is the text of the task and must be cut if it is too long.
          </md-card-content>

          <md-card-content>
            <h3 class="md-subheading">Expiration</h3>
            <div class="md-subhead">Into 15 hours</div>
          </md-card-content>
        </md-card>
      </md-layout>

    </md-layout>

  </section>
</template>

<script>
export default {
  name: 'tasks',
  data() {
    return {};
  }
};
</script>

<style scoped>
  .task__block {
    margin: 10px 0px;
  }
</style>
