<template>
    <v-card tile>
        <v-row>
            <v-col
                cols="2"
                class="d-flex align-center justify-center"
            >
                <div
                    class="complete"
                    :class="todo.isDone ? 'complete-active' : ''"
                    @click="$emit('complete-todo', todo.id)"
                >
                    <v-icon
                        v-if="todo.isDone"
                        class="complete-active-icon"
                        color="#61ed89"
                    >
                        mdi-check
                    </v-icon>
                </div>
            </v-col>
            <v-col cols="8">
                <span class="caption grey--text todo-id">id{{ todo.id }}</span>
                <v-card-title
                    class="pt-0 description"
                    :class="todo.isDone ? 'todo-done' : ''"
                >
                    {{ todo.description }}
                </v-card-title>
            </v-col>
            <v-col
                cols="2"
                class="d-flex align-center justify-center"
            >
                <v-tooltip top>
                    <template #activator="{ on }">
                        <v-icon
                            v-on="on"
                            class="remove"
                            @click="$emit('remove-todo', todo.id)"
                        >
                            mdi-close
                        </v-icon>
                    </template>
                    <span>remove</span>
                </v-tooltip>
            </v-col>
        </v-row>
    </v-card>
</template>
<script>
export default {
    name: 'TodoItem',
    props: {
        todo: {
            type: Object,
            default: null
        }
    }
}
</script>

<style lang="sass" scoped>
.remove:hover
    color: tomato
.todo-id
    user-select: none
.complete
    display: flex
    justify-content: center
    align-items: center
    height: 40px
    width: 40px
    border-radius: 50%
    border: 2px solid lightGrey
    cursor: pointer
    transition: .4s
.complete:hover
    border: 2px solid lightGreen
    background-color: #e0ffe7
.complete-active
    border: 2px solid lightGreen
    background-color: #e0ffe7
.todo-done
    text-decoration: line-through
    color: lightGrey
</style>