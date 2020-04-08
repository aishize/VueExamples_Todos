export default {
    getTodos: ({ commit }, payload) => {
        commit('SET_EXIST_TODOS', payload)
    },
    addTodo: ({ commit }, todo) => {
        commit('ADD_TODO', todo)
    },
    removeTodo: ({ commit }, id) => {
        commit('REMOVE_TODO', id)
    },
    completeTodo: ({ commit }, id) => {
        commit('COMPLETE_TODO', id)
    },
    removeCompleted: ({ commit }) => {
        commit('REMOVE_COMPLETED')
    },
    completeAll: ({ commit }) => {
        commit('COMPLETE_ALL')
    }
}