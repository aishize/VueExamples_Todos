<template>
    <v-container class="todo">
        <v-row class="d-flex justify-center align-center">
            <v-col
                cols="12"
                lg="6"
                md="8"
                sm="10"
            >
                <v-card>
                    <Header :hasError="hasError"/>
                    <div class="todo-input">
                        <div class="complete-all">
                            <v-icon
                                tag="div"
                                large
                                class="mt-3"
                                :class="allTodosCompleted ? 'complete-all-checked' : 'complete-all-unchecked'"
                                @click="completeAll"
                            >
                                mdi-check-all
                            </v-icon>
                        </div>
                        <v-text-field
                            v-model.trim="todo"
                            height="65"
                            solo
                            placeholder="What needs to be done?"
                            clearable
                            @keyup.enter="addTodo"
                        />
                    </div>
                    <div v-if="isThere">
                        <TodoItem
                            v-for="(todo, index) in currentDisplay"
                            :key="index"
                            :todo="todo"
                            @remove-todo="removeTodo"
                            @complete-todo="completeTodo"
                        />
                        <Footer
                            :currentType="type"
                            @display-by-type="toDisplay"
                            @remove-completed="removeCompleted"
                        />
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TodoItem from '@/components/TodoItem'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { generateId } from '@/util/helper'

export default {
    name: 'Home',
    components: {
        TodoItem,
        Header,
        Footer
    },
    data: () => ({
        type: 'all',
        todo: '',
        hasError: false
    }),
    computed: {
        ...mapState({ todoList: state => state.todoList }),
        isThere: function () {
            return this.todoList.length > 0
        },
        currentDisplay: function () {
            if (this.type === 'active') return this.activeTodo
            if (this.type === 'done') return this.completedTodo
            return this.todoList
        },
        activeTodo: function () {
            return this.todoList.filter(todo => todo.isDone !== true)
        },
        completedTodo: function () {
            return this.todoList.filter(todo => todo.isDone === true)
        },
        allTodosCompleted: function () {
            if (this.todoList.length === 0) return false
            return this.todoList.every(todo => todo.isDone === true)
        }
    },
    watch: {
        todoList: function (todoUpdate) {
            localStorage.setItem('todos', JSON.stringify(todoUpdate))
        }
    },
    methods: {
        ...mapActions({
            add: 'addTodo',
            remove: 'removeTodo',
            complete: 'completeTodo',
            allDone: 'completeAll',
            removeDone: 'removeCompleted'
        }),
        addTodo: function () {
            if (this.todo !== '') {
                const id = generateId(this.todoList)
                const todo = {
                    description: this.todo,
                    id,
                    isDone: false
                }
                this.add(todo)
                this.todo = ''
                if (this.type === 'done') {
                    this.type = 'active'
                }
            } else {
                this.showError()
            }
        },
        removeTodo: function (id) {
            this.remove(id)
        },
        completeTodo: function (id) {
            this.complete(id)
        },
        showError: function () {
            this.hasError = true
            setTimeout(() => {
                this.hasError = false
            }, 950)
        },
        toDisplay: function (type) {
            this.type = type
        },
        removeCompleted: function () {
            this.removeDone()
            this.type = 'all'
        },
        completeAll: function () {
            this.allDone()
        }
    }
}
</script>
<style lang="sass" scoped>
.todo
    margin-top: 250px
    display: flex
    align-items: center
    justify-content: center
.todo-input
    margin-right: 10px
    display: grid
    grid-template-columns: 1fr 5fr
.complete-all
    height: 100%
    width: 100%
    display: flex
    justify-content: center
    align-items: flex-start
.complete-all-unchecked
    cursor: pointer
.complete-all-unchecked:hover
    color: #7fb87f
.complete-all-checked
    color: #7dff7d
</style>
    