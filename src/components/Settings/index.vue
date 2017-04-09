<template>
  <section class="section settings">
    <md-tabs md-centered class="tabs" @change="onChange">
      <md-tab md-label="Configuration" />
      <md-tab md-label="Password" />
    </md-tabs>

    <div v-if="tab === 0" class="tab__content">
      <md-layout :md-gutter="16" md-align="center" class="fixGutter">
        <md-layout md-column md-flex="50" md-flex-xsmall="100">
          <h2 class="md-title">Edit Configuration</h2>
          <md-switch
            v-model="conf.showRelativeDates"
            class="md-primary"
            @change="setStorage('showRelativeDates')"
          >
            Show relative dates
          </md-switch>
        </md-layout>
      </md-layout>
    </div>

    <div v-if="tab === 1" class="tab__content">
      <md-layout :md-gutter="16" md-align="center" class="fixGutter">
        <md-layout md-column md-flex="50" md-flex-xsmall="100">
          <h2 class="md-title">Change Password</h2>
          <form v-on:submit.prevent="changePassword">
            <md-input-container
              class="input__container"
              v-bind:class="{ 'md-input-invalid': passErrors.password }"
            >
              <label>Actual Password</label>
              <md-input
                type="password"
                v-model="pass.password"
                maxlength="50"
              />
              <span class="md-error">Password required</span>
            </md-input-container>
            <md-input-container
              class="input__container"
              v-bind:class="{ 'md-input-invalid': passErrors.newPassword }"
            >
              <label>New Password</label>
              <md-input
                type="password"
                v-model="pass.newPassword"
                maxlength="50"
              />
              <span class="md-error">New Password required</span>
            </md-input-container>
            <md-input-container
              class="input__container"
              v-bind:class="{ 'md-input-invalid': passErrors.confirmPassword }"
            >
              <label>Confirm New Password</label>
              <md-input
                type="password"
                v-model="pass.confirmPassword"
                maxlength="50"
              />
              <span class="md-error">Must repeat the New Password</span>
            </md-input-container>
            <div class="buttons__block">
              <md-button
                v-if="!isRequestingPass"
                type="submit"
                class="md-raised md-primary"
              >
                Update
              </md-button>
              <loading-button :show="isRequestingPass" />
            </div>
          </form>
        </md-layout>
      </md-layout>
    </div>
  </section>
</template>

<script>
import storage from 'key-storage';
import UserService from '../../services/userService';

const baseErrors = () => {
  return {
    password: false,
    newPassword: false,
    confirmPassword: false
  };
};

const parseStorage = (val) => {
  if (val === 'true' || val === true) {
    return true;
  }
  return false;
};

export default {
  name: 'Settings',
  data() {
    return {
      tab: 0,
      conf: {
        showRelativeDates: parseStorage(storage.get('showRelativeDates'))
      },
      pass: {
        password: '',
        newPassword: '',
        confirmPassword: ''
      },
      passErrors: baseErrors(),
      isRequestingPass: false
    };
  },
  methods: {
    onChange(val) {
      this.tab = val;
    },
    changePassword() {
      this.passErrors = baseErrors();
      const { password, newPassword, confirmPassword } = this.pass;
      if (password.trim().length === 0) {
        this.passErrors.password = true;
      }
      if (newPassword.trim().length === 0) {
        this.passErrors.newPassword = true;
      }
      if (confirmPassword.trim().length === 0 || confirmPassword !== newPassword) {
        this.passErrors.confirmPassword = true;
      }
      if (this.passErrors.password === false &&
        this.passErrors.newPassword === false &&
        this.passErrors.confirmPassword === false
      ) {
        this.isRequestingPass = true;
        UserService.changePassword(this.pass)
        .then((response) => {
          if (response.data.code === 200) {
            this.pass.password = '';
            this.pass.newPassword = '';
            this.pass.confirmPassword = '';
            this.showModal('Password updated');
          } else {
            this.showModal('Password not modified');
          }
          this.isRequestingPass = false;
        }, () => {
          this.showModal('Password not modified');
          this.isRequestingPass = false;
        });
      }
    },
    showModal(msg) {
      global.eventHub.$emit('showModal', {
        title: 'Settings',
        message: msg
      });
    },
    setStorage(key) {
      storage.set(key, !this.conf.showRelativeDates);
    }
  }
};
</script>

<style scoped>
  .tabs {
    position: fixed;
    width: 100%;
    left: 0px;
    z-index: 2;
  }

  .tab__content {
    padding-top: 64px;
  }

  .buttons__block {
    margin: 20px 0px;
  }
</style>
