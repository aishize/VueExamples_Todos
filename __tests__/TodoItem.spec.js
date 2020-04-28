import Vue from 'vue'
import Vuetify from 'vuetify'
import { createLocalVue, mount } from '@vue/test-utils'
import TodoItem from '@/components/TodoItem'

Vue.use(Vuetify)

describe('TodoItem', () => {
  let vuetify, localVue
  beforeEach(() => {
    vuetify = new Vuetify()
    localVue = createLocalVue()
  })
  const mountFunction = (isDone = { isDone: false  }, options = {}) => {
    return mount(TodoItem, {
      localVue,
      vuetify,
      propsData: {
        todo: {
          description: 'Test',
          id: 1,
          ...isDone
        }
      },
      ...options
    })
  }
  it('TodoItem is a Vue Instance', () => {
    const wrapper = mountFunction()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('render correct todo info', () => {
    const wrapper = mountFunction()

    expect(wrapper.find('.todo-id').text()).toBe('id1')
    expect(wrapper.find('.description').text()).toBe('Test')
  })
  it('display active classes if prop isDone has value true', () => {
    const wrapper = mountFunction({ isDone: true })

    expect(wrapper.find('.complete-active').exists()).toBeTruthy()
    expect(wrapper.find('.complete-active-icon').exists()).toBeTruthy()
    expect(wrapper.find('.todo-done').exists()).toBeTruthy()
  })
  it('emitted "complete-todo" and "remove-todo"', async () => {
    const wrapper = mountFunction({ isDone: true })

    wrapper.find('.complete-active-icon').trigger('click')
    wrapper.find('.remove').trigger('click')

    const emitted = Object.keys(wrapper.emitted())
    expect(emitted).toStrictEqual(['complete-todo', 'remove-todo'])
  })
})