import axios from 'axios'

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
    },
    asyncApiCall: async ({ commit }) => {
        try {
            const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
            commit('ASYNC_API_CALL', data)
        } catch (error) {
            throw Error("API error occurred")
        }
    },
    asyncApiCallAuthorization: async ({ commit }, { username, password }) => {
        try {
            const isAuthenticated = await axios.post('api-example/auth/login', {
                username,
                password
            })
            commit("SET_AUTH", isAuthenticated)
        } catch (error) {
            throw Error("API error occurred")
        }
    }
}