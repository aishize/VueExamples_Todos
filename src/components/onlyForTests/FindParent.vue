<template>
  <div>
      <span v-show="showSpan">
        Parent Component
      </span>
      <Children v-if="showChild" />
    </div>
</template>
<script>
import Children from './Children'

export default {
  name: 'FindParent',
  components: {
    Children
  },
  data: () => ({
    showSpan: false,
    showChild: false
  })
}
</script>
