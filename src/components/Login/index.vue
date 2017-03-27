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
                <md-input
                  type="email"
                  autocorrect="off"
                  autocapitalize="none"
                  v-model="login.email"
                />
              </md-input-container>
              <md-input-container md-has-password>
                <label>Password</label>
                <md-input
                  type="password"
                  autocorrect="off"
                  autocapitalize="none"
                  v-model="login.password"
                />
              </md-input-container>
            </md-card-content>
            <md-card-actions>
              <md-button class="md-raised md-primary" type="submit" v-if="!isLogin">Login</md-button>
              <loading-button :show="isLogin" />
              <md-button>I forgot my password</md-button>
            </md-card-actions>
          </md-card>
        </form>
      </md-layout>
    </md-layout>
  </section>
</template>

<script>
import storage from 'key-storage';
import LoginService from '../../services/loginService';

export default {
  name: 'Login',
  data() {
    return {
      login: {
        email: '',
        password: ''
      },
      isLogin: false
    };
  },
  methods: {
    doLogin() {
      this.isLogin = true;
      LoginService.login(this.login.email, this.login.password)
      .then((response) => {
        if (response.data.code === 200) {
          storage.set('token', response.data.data.token);
          document.location.href = '/';
        } else {
          this.isLogin = false;
        }
      }).catch((error) => {
        console.log(error);
        this.isLogin = false;
      });
    }
  }
};
</script>

<style scoped>
  .login {
    padding-top: 20px;
  }
</style>
