<template>
  <div>
    <v-btn
      tag="button"
      class="commit"
      @click="handleCommit"
    >
      commit
    </v-btn>
    <v-btn
      tag="button"
      class="dispatch"
      @click="handleDispatch"
    >
      dispatch
    </v-btn>
    <v-btn
      tag="button"
      class="namespaced-dispatch"
      @click="handleNamespacedDispatch"
    >
      namespaced dispatch          
    </v-btn>
  </div>
</template>
<script>
export default {
  name: 'ComponentWithButtons',
  methods: {
    handleCommit: function () {
      this.$store.commit("testMutation", { msg: "Test Commit" })
    },
    handleDispatch: function () {
      this.$store.dispatch("testAction", { msg: "Test Dispatch" })
    },
    handleNamespacedDispatch: function () {
      this.$store.dispatch("namespaced/very/deeply/testAction", { msg: "Test Namespaced Dispatch" })
    }
  }
}
</script>