export default {
    ADD_TODO: (state, payload) => {
        state.todoList = [...state.todoList, payload]
    },
    REMOVE_TODO: (state, id) => {
        state.todoList = state.todoList.filter(todo => todo.id !== id)
    },
    COMPLETE_TODO: (state, id) => {
        state.todoList = state.todoList.map(item => {
            if (item.id === id) {
                item.isDone = !item.isDone
                return item
            } else {
                return item
            }
        })
    },
    REMOVE_COMPLETED: state => {
        state.todoList = state.todoList.filter(todo => todo.isDone !== true)
    },
    COMPLETE_ALL: state => {
        const every = state.todoList.every(todo => todo.isDone === true)
        state.todoList = state.todoList.map(todo => {
            if (every) {
                todo.isDone = !todo.isDone
            } else {
                todo.isDone = true
            }
            return todo
        })
    },
    SET_EXIST_TODOS: (state, payload) => {
        state.todoList = [...state.todoList, ...payload]
    },
    ASYNC_API_CALL: (state, data) => {
        state.asyncCall = [...state.asyncCall, data]
    },
    SET_AUTH: (state, isAuthenticated) => {
        state.auth = isAuthenticated
    }
}