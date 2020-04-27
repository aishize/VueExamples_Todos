<template>
  <div>
    {{ greeting }}
  </div>
</template>
<script>
export default {
  name: 'Greeting',
  data: () => ({
    greeting: 'Vue and TDD'
  })
}
</script>