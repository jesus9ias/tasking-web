<template>
  <md-layout :md-gutter="16" md-align="center" class="fixGutter">
    <md-layout md-column md-flex="50" md-flex-xsmall="100">
      <h2 class="md-title">{{ titleText }}</h2>
      <form class="md-flex" novalidate @submit.stop.prevent="action">
        <md-input-container v-bind:class="{ 'md-input-invalid': errors.title }">
          <label>Title</label>
          <md-input v-model="task.title" />
          <span class="md-error">Title must have between 1 and 100 characters</span>
        </md-input-container>
        <md-input-container v-bind:class="{ 'md-input-invalid': errors.description }">
          <label>Description</label>
          <md-textarea class="description__area" maxlength="500" v-model="task.description" />
          <span class="md-error">Description must have between 1 and 500 characters</span>
        </md-input-container>
        <md-input-container v-bind:class="{ 'md-input-invalid': errors.limitDate }">
          <label>Limit Date</label>
          <md-input type="datetime-local" v-model="task.limitDate" />
          <span class="md-error">Must specify a well formatted date</span>
        </md-input-container>
        <md-input-container v-bind:class="{ 'md-input-invalid': errors.priority }">
          <label for="priority">Priority</label>
          <md-select id="priority" v-model="task.priority">
            <md-option v-bind:value="1">Low</md-option>
            <md-option v-bind:value="2">Medium</md-option>
            <md-option v-bind:value="3">Hign</md-option>
            <md-option v-bind:value="4">Extreme</md-option>
          </md-select>
          <span class="md-error">Must specify a Priority value from the list</span>
        </md-input-container>

        <md-chips v-model="tagsx" md-input-placeholder="Add a Tag"></md-chips>

        <md-button type="submit" class="md-raised md-primary" v-if="!isRequesting">{{ actionText || 'Save' }}</md-button>
        <loading-button :show="isRequesting" />
      </form>
    </md-layout>
  </md-layout>
</template>

<script>
const baseErrors = () => {
  return {
    title: false,
    description: false,
    limitDate: false,
    priority: false
  };
};

export default {
  name: 'DefTask',
  data() {
    return {
      errors: baseErrors(),
      tagsx: []
    };
  },
  created() {
    this.tagsx = this.tags;
  },
  methods: {
    action() {
      if (this.validateForm()) {
        this.taskAction();
      }
    },
    validateForm() {
      this.errors = baseErrors();
      if (this.task.title.trim() === '') {
        this.errors.title = true;
      }
      if (this.task.description.trim() === '') {
        this.errors.description = true;
      }
      if (this.task.limitDate.trim() === '') {
        this.errors.limitDate = true;
      }
      if ([1, 2, 3, 4].indexOf(this.task.priority) === -1) {
        this.errors.priority = true;
      }
      if (this.errors.title === false
        && this.errors.description === false
        && this.errors.limitDate === false
        && this.errors.priority === false
      ) {
        return true;
      }
      return false;
    }
  },
  computed: {
    tags() {
      return this.task.tagsToTask.map((tag) => {
        return tag.taggedWithTag.name;
      });
    }
  },
  props: {
    task: Object,
    taskAction: Function,
    isRequesting: Boolean,
    actionText: String,
    titleText: String
  }
};
</script>

<style scoped>
  .md-input.description__area {
    height: 200px !important;
  }
</style>
