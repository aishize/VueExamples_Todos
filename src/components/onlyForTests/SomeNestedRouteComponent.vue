<template>
  <div>
    {{ text }}
    <v-card class="username">
      <v-card-title>
        {{ paramsText }}
      </v-card-title>
    </v-card>
  </div>
</template>
<script>
import { libraryImitator } from '@/util/helper'

export default {
  name: 'SomeNestedRouteComponent',
  data: () => ({
    text: 'nested route'
  }),
  beforeRouteEnter: function (to, from, next) {
    libraryImitator()
    next()
  },
  computed: {
    paramsText: function () {
      if (!this.$route.params.username) return 'default'
      return this.$route.params.username
    }
  }
}
</script>