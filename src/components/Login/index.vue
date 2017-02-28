<template>
  <section class="login">
    <md-layout class="fixGutter" :md-gutter="16" md-align="center">
      <md-layout md-flex="50" md-flex-xsmall="100">
        <form class="md-flex" novalidate @submit.prevent="doLogin">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">Login into Tasking</div>
              <div class="md-subhead">Write your User and Password</div>
            </md-card-header>
            <md-card-content>
              <md-input-container>
                <label>User</label>
                <md-input type="text" v-model="login.user"></md-input>
              </md-input-container>
              <md-input-container md-has-password>
                <label>Password</label>
                <md-input type="password" v-model="login.password"></md-input>
              </md-input-container>
            </md-card-content>
            <md-card-actions>
              <md-button class="md-raised md-primary" type="submit">Login</md-button>
              <md-button>I forgot my password</md-button>
            </md-card-actions>
          </md-card>
        </form>
      </md-layout>
    </md-layout>
  </section>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      login: {
        user: '',
        password: ''
      }
    };
  },
  methods: {
    doLogin() {
      console.log('login');
    }
  }
};
</script>

<style scoped>
  .login {
    padding-top: 20px;
  }
</style>
