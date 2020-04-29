<template>
  <div>
    {{ text }}
    <v-card class="username">
      <v-card-title>
        {{ $route.query.username }}
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
  }
}
</script>