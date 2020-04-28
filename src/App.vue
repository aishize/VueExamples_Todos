<template>
  <v-app>
    <v-app-bar
      app
    >
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  created: function () {
    this.initial()
  },
  methods: {
    ...mapActions(['getTodos']),
    initial: function () {
      const storage = localStorage.getItem('todos')
      const todos = JSON.parse(storage)
      if (todos.length) {
        this.getTodos(todos)
      }
    }
  }
};
</script>
<style lang="sass">
html
  overflow-y: auto !important
</style>
