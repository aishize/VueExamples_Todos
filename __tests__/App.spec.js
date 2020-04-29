import Vue from 'vue'
import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import VueRouter from "vue-router"
import App from '../src/App'
import Home from '../src/views/Home'
import SomeNestedRouteComponent from '../src/components/onlyForTests/SomeNestedRouteComponent'
import mockModule from '../src/util/helper'

const localVue = createLocalVue()
localVue.use(VueRouter)
Vue.use(Vuetify)

const routes = [
  { path: "/", name: 'home', component: Home },
  { path: "/nested-route", name: 'nested', component: SomeNestedRouteComponent, props: true }
]

// jest.mock("@/views/Home.vue", () => ({
//   name: "Home",
//   render: h => h("div")
// }))
jest.mock('@/util/helper', () => ({ libraryImitator: jest.fn() }))

describe('App', () => {
  let vuetify, router
  beforeEach(() => {
    vuetify = new Vuetify()
    router = new VueRouter({ 
      routes 
    }) 
  })
  const mountFunction = options => {
    return mount(App, {
      localVue, 
      vuetify,
      router,
      mocks: {
        $store: {
          state: {
            todoList: jest.fn()
          }
        }
      },
      methods: {
        initial: jest.fn()
      },
      ...options
    })
  }
  it('App is a Vue instance', () => {
    const wrapper = mountFunction()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('render Home component', () => {
    const wrapper = mountFunction()
    expect(wrapper.find({ name: 'Home' }).exists()).toBeTruthy()
  })
  it('renders a child component via routing', async () => {
    const wrapper = mountFunction()
    router.push('/nested-route')
    await wrapper.vm.$nextTick()
    expect(wrapper.find({ name: 'SomeNestedRouteComponent' }).exists()).toBeTruthy()
  })
  it('renders a username from query string when push to /nested-route', async () => {
    const username = 'John'
    const wrapper = mountFunction()
    router.push({ name: 'nested', query: { username } }).catch(() => {})
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.username').text()).toContain(username)
  })
})
describe('SomeNestedRouteComponent', () => {
  let vuetify
  beforeEach(() => {
    vuetify = new Vuetify()
  })
  it('renders a username from query string with $route mock', async () => {
    const username = 'John'
    const wrapper = mount(SomeNestedRouteComponent, {
      mocks: {
        $route: {
          query: { username }
        }
      },
      vuetify
    })
    expect(wrapper.find('.username').text()).toContain(username)
  })
  it('calls libraryImitator and next when enter the route', () => {
    const next = jest.fn()
    SomeNestedRouteComponent.beforeRouteEnter(undefined, undefined, next)

    expect(mockModule.libraryImitator).toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })
})

