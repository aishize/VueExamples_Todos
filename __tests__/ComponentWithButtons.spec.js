import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { createLocalVue, mount } from '@vue/test-utils'
import ComponentWithButtons from '../src/components/onlyForTests/ComponentWithButtons'

const localVue = createLocalVue()
localVue.use(Vuex)
// localVue.use(Vuetify)
Vue.use(Vuetify)
const mutations = {
  testMutation: jest.fn()
}
const store = new Vuex.Store({ mutations })

describe('ComponentWithButtons', () => {
  let vuetify
  beforeEach(() => {
    vuetify = new Vuetify()
  })
  const mountFunction = options => {
    return mount(ComponentWithButtons, {
      localVue,
      vuetify,
      ...options,
    })
  }
  it('commits a mutation when click a button', async () => {
    const wrapper = mountFunction({ store })
    wrapper.find('.commit').trigger('click')
    await wrapper.vm.$nextTick()
    expect(mutations.testMutation).toHaveBeenCalledWith({}, { msg: 'Test Commit' })
  })
  it('dispatch a namespaced action when click a button', async () => {
    const store = new Vuex.Store()
    store.dispatch = jest.fn()

    const wrapper = mountFunction({ store })
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
    const wrapper = mountFunction({
      mocks: {
        $store: mockStore
      }
    })
    wrapper.find('.dispatch').trigger('click')
    await wrapper.vm.$nextTick()
    expect(mockStore.dispatch).toHaveBeenCalledWith('testAction', { msg: 'Test Dispatch' })
  })
})
