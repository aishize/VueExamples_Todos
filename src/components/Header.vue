<template>
   <div class="header">
        <span
            v-if="!hasError"
            class="headline grey--text"
        >
            Your Todos!
        </span>
        <span
            v-else
            class="headline error-title animated flash"
        >
            Enter Todos!!
        </span>
    </div> 
</template>
<script>
export default {
    name: 'Header',
    props: {
        hasError: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<style lang="sass" scoped>
.header
    height: 68px
    display: flex
    align-items: center
    justify-content: flex-start
    padding-left: 20px
.error-title
    color: tomato
</style>