// import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import ComponentWithButtons from '../ComponentWithButtons'

const localVue = createLocalVue()
localVue.use(Vuex)
const mutations = {
  testMutation: jest.fn()
}
const store = new Vuex.Store({ mutations })

describe('ComponentWithButtons', () => {
  let vuetify
  beforeEach(() => {
    vuetify = new Vuetify()
  })
  it('commits a mutation when click a button', async () => {
    const wrapper = shallowMount(ComponentWithButtons, {
      store, localVue,
      vuetify
    })
    wrapper.find('.commit').trigger('click')
    await wrapper.vm.$nextTick()
    expect(mutations.testMutation).toHaveBeenCalledWith({}, { msg: 'Test Commit' })
  })
  it('dispatch a namespaced action when click a button', async () => {
    const store = new Vuex.Store()
    store.dispatch = jest.fn()

    const wrapper = shallowMount(ComponentWithButtons, {
      store, localVue, vuetify
    })
    wrapper.find('.namespaced-dispatch').trigger('click')
    // wrapper.vm.handleNamespacedDispatch()
    await wrapper.vm.$nextTick()
    expect(store.dispatch).toHaveBeenCalledWith(
      'namespaced/very/deeply/testAction',
      { msg: 'Test Namespaced Dispatch' }
    )
  })
  it('dispatch an action when click a button', async () => {
    const mockStore = { dispatch: jest.fn() }
    const wrapper = shallowMount(ComponentWithButtons, {
      mocks: {
        $store: mockStore
      },
      vuetify
    })
    wrapper.find('.dispatch').trigger('click')
    await wrapper.vm.$nextTick()
    expect(mockStore.dispatch).toHaveBeenCalledWith('testAction', { msg: 'Test Dispatch' })
  })
})
