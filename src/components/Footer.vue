<template>
    <div class="footer">
        <div class="d-flex align-center justify-center">
            <div class="items-left">
                {{ itemsLeft }} items left
            </div>
        </div>
        <div class="d-flex align-center justify-space-around">
            <v-btn
                v-for="(button, index) in buttons"
                :key="index"
                tile
                small
                text
                class="dispatcher mx-0"
                :class="button.type === currentType ? 'active' : ''"
                @click="$emit('display-by-type', button.type)"
            >
                {{ button.name }}
            </v-btn>
        </div>
        <div class="d-flex align-center justify-center">
            <div
                class="clear"
                @click="$emit('remove-completed')"
            >
                clear completed
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Footer',
    props: {
        currentType: {
            type: String,
            default: 'all'
        }
    },
    data: () => ({
        buttons: [
            {name: 'All', type: 'all'},
            {name: 'Active', type: 'active'},
            {name: 'Completed', type: 'done'}
        ]
    }),
    computed: {
        ...mapGetters(['itemsLeft'])
    }
}
</script>
<style lang="sass" scoped>
.footer
    height: 60px
    display: grid
    grid-template-columns: 2fr 3fr 2fr
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2)
.items-left
    color: grey
    user-select: none
.clear
    cursor: pointer 
    color: grey
    user-select: none
    transition: .2s
.clear:hover
    text-decoration: underline
.dispatcher
    user-select: none
    color: grey
    cursor: pointer
    padding: 4px
    transition: .2s
    border: 1px solid rgba(0,0,0,0)
.dispatcher:hover
    border: 1px solid #dbc2a2
.active
    border: 1px solid #dbc2a2
</style>