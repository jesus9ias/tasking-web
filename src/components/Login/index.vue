<template>
  <section class="login">
    <md-layout
      class="fixGutter"
      md-align="center"
      :md-gutter="16"
    >
      <md-layout md-flex="50" md-flex-xsmall="100">
        <form class="md-flex" novalidate @submit.prevent="doLogin">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">Login into Tasking</div>
              <div class="md-subhead">Write your User and Password</div>
            </md-card-header>
            <md-card-content>
              <md-input-container v-bind:class="{ 'md-input-invalid': errors.email }">
                <label>User</label>
                <md-input
                  type="email"
                  autocorrect="off"
                  autocapitalize="none"
                  v-model="login.email"
                />
                <span class="md-error">Must write a correct Email</span>
              </md-input-container>
              <md-input-container md-has-password v-bind:class="{ 'md-input-invalid': errors.password }">
                <label>Password</label>
                <md-input
                  type="password"
                  autocorrect="off"
                  autocapitalize="none"
                  v-model="login.password"
                />
                <span class="md-error">Must write a correct Password</span>
              </md-input-container>
            </md-card-content>
            <md-card-actions>
              <md-button class="md-raised md-primary" type="submit" v-if="!isLogin">Login</md-button>
              <loading-button :show="isLogin" />
            </md-card-actions>
          </md-card>
        </form>
      </md-layout>
    </md-layout>
  </section>
</template>

<script>
import storage from 'key-storage';
import errors from '../../utils/errors';
import LoginService from '../../services/loginService';

const baseErrors = () => {
  return {
    email: false,
    password: false
  };
};

export default {
  name: 'Login',
  data() {
    return {
      login: {
        email: '',
        password: ''
      },
      errors: baseErrors(),
      errorMessage: '',
      isLogin: false
    };
  },
  methods: {
    doLogin() {
      this.errors = baseErrors();
      this.isLogin = true;
      if (this.login.email.trim() === '') {
        this.errors.email = true;
      }
      if (this.login.password.trim() === '') {
        this.errors.password = true;
      }

      if (this.errors.email === false && this.errors.password === false) {
        LoginService.login(this.login.email, this.login.password)
        .then((response) => {
          if (response.data.code === 200) {
            storage.set('token', response.data.data.token);
            document.location.href = '/';
          } else {
            if (response.data.code === 404) {
              this.showModal('Incorrect Login Data');
            } else {
              this.showModal(errors(response.data.code));
            }
            this.isLogin = false;
          }
        }).catch(() => {
          this.showModal('Incorrect Login Data');
          this.isLogin = false;
        });
      } else {
        this.isLogin = false;
      }
    },
    showModal(msg) {
      global.eventHub.$emit('showModal', {
        title: 'Login',
        message: msg
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
