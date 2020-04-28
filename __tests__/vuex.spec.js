import mutations from '../src/store/mutations'
import getters from '../src/store/getters'
import actions from '../src/store/actions'
import flushPromises from 'flush-promises'

let url = ''
let body = {}
let mockError = false
jest.mock('axios', () => ({
  get: (_url) => {
    return new Promise(resolve => {
      if (mockError) throw Error()
      url = _url
      resolve({ data: null })
    })
  },
  post: (_url, _body) => {
    return new Promise(resolve => {
      if (mockError) throw Error()
      url = _url
      body = _body
      resolve(true)
    })
  }
}))

describe('isolated VUEX testing', () => {
  describe('testing mutations', () => {
    it('ADD_TODO', () => {
      const todo = {
        description: 'learn unit testing',
        id: 1,
        isDone: false
      }
      const state = {
        todoList: []
      }
      mutations.ADD_TODO(state, todo)
      expect(state).toEqual({
        todoList: [{
          description: 'learn unit testing',
          id: 1,
          isDone: false
        }]
      })
    })
    it('REMOVE_TODO', () => {
      const todo = {
        description: 'learn unit testing',
        id: 1,
        isDone: false
      }
      const state = {
        todoList: []
      }
      mutations.ADD_TODO(state, todo)
      mutations.REMOVE_TODO(state, 1)
      expect(state).toEqual({
        todoList: []
      })
    })
    it('COMPLETE_TODO', () => {
      const todo = {
        description: 'learn unit testing',
        id: 1,
        isDone: false
      }
      const state = {
        todoList: []
      }
      mutations.ADD_TODO(state, todo)
      mutations.COMPLETE_TODO(state, 1)
      expect(state).toEqual({
        todoList: [{
          description: 'learn unit testing',
          id: 1,
          isDone: true
        }]
      })
    })
    it('COMPLETE_ALL', () => {
      const todo = {
        description: 'learn unit testing',
        id: 1,
        isDone: false
      }
      const secondTodo = {
        description: 'learn unit testing',
        id: 2,
        isDone: false
      }
      const state = {
        todoList: []
      }
      mutations.ADD_TODO(state, todo)
      mutations.ADD_TODO(state, secondTodo)
      mutations.COMPLETE_ALL(state)
      expect(state).toEqual({
        todoList: [
        {
          description: 'learn unit testing',
          id: 1,
          isDone: true
        },
        {
          description: 'learn unit testing',
          id: 2,
          isDone: true
        }
      ]
      })
    })
    it('REMOVE_COMPLETED', () => {
      const todo = {
        description: 'learn unit testing',
        id: 1,
        isDone: true
      }
      const secondTodo = {
        description: 'learn unit testing',
        id: 2,
        isDone: false
      }
      const state = {
        todoList: [
          todo,
          secondTodo
        ]
      }
      mutations.REMOVE_COMPLETED(state)
      expect(state).toEqual({
        todoList: [{
          description: 'learn unit testing',
          id: 2,
          isDone: false
        }]
      })
    })
  })
  describe('testing getters', () => {
    it('itemsLeft', () => {
      const todo = {
        description: 'learn unit testing',
        id: 1,
        isDone: false
      }
      const secondTodo = {
        description: 'learn unit testing',
        id: 2,
        isDone: false
      }
      const state = {
        todoList: [todo, secondTodo]
      }
      const itemsLeft = getters.itemsLeft(state)
      expect(itemsLeft).toBe(2)
    })
  })
  describe('testing actions', () => {
    it('asyncApiCall', async () => {
        const commit = jest.fn()
        actions.asyncApiCall({ commit })
        await flushPromises()
        expect(url).toBe('https://jsonplaceholder.typicode.com/todos/1')
        expect(commit).toHaveBeenCalledWith(
          'ASYNC_API_CALL', null)
      })
    it("asyncApiCallAuthorization", async () => {
      const commit = jest.fn()
      const username = "alice"
      const password = "password"
  
      await actions.asyncApiCallAuthorization({ commit }, { username, password })
      await flushPromises()
      expect(url).toBe("api-example/auth/login")
      expect(body).toEqual({ username, password })
      expect(commit).toHaveBeenCalledWith(
        "SET_AUTH", true)
    })
  })
  describe('api errors', () => {
    it("catching jsonPlaceHolder api errors", async () => {
      mockError = true
    
      await expect(actions.asyncApiCall({ commit: jest.fn() }))
        .rejects.toThrow("API error occurred")
    })
    it("catching auth api errors", async () => {
      mockError = true
    
      await expect(actions.asyncApiCallAuthorization({ commit: jest.fn() }, {}))
        .rejects.toThrow("API error occurred")
    })
  })
})