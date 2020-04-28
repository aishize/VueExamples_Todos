import { createLocalVue, mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { createRouter } from '@/util/createRouter'
import { createStore } from '@/util/createStore'
import Posts from '../src/components/onlyForTests/Posts'


// localVue.use(Vuetify)
Vue.use(Vuetify)

const createTestVue = () => {
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  localVue.use(Vuex)

  const store = createStore()
  const router = createRouter()
  return { localVue, store, router }
}

describe('Posts', () => {
  let vuetify
  beforeEach(() => {
    vuetify = new Vuetify()
  })
  const { localVue, store, router } = createTestVue()
  const mountFunction = options => {
    return mount(Posts, {
      localVue,
      vuetify,
      store,
      router,
      ...options
    })
  }
  it('Posts is a Vue Instance', () => {
    const wrapper = mountFunction()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('renders a message if passed', () => {
    const message = 'New content coming soon!'
    const wrapper = mountFunction({
      propsData: {
        message
      }
    })
    expect(wrapper.find('#message').text()).toBe('New content coming soon!')
  })
  it('renders posts', async () => {
    const wrapper = mountFunction()
    wrapper.vm.$store.commit('ADD_POSTS', [{ id: 1, title: 'Test'}, { id: 2, title: 'Test'}])
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('.post').length).toBe(2)
  })
  it('renders a router-link to "/posts/new" if authenticated', async () => {
    const authenticated = true
    const wrapper = mountFunction()
    wrapper.vm.$store.commit('SET_AUTH', authenticated)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.new-post').exists()).toBeTruthy()
  })
})