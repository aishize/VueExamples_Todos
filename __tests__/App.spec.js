import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import VueRouter from "vue-router"
import App from '../src/App'
import Home from '../src/views/Home'
import SomeNestedRouteComponent from '../src/components/onlyForTests/SomeNestedRouteComponent'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuetify)

const routes = [
  { path: "/", component: Home },
  { path: "/nested-route", component: SomeNestedRouteComponent }
]

// jest.mock("@/views/Home.vue", () => ({
//   name: "Home",
//   render: h => h("div")
// }))

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
  it('render nested route component', async () => {
    const wrapper = mountFunction()
    router.push('/nested-route')
    await wrapper.vm.$nextTick()
    expect(wrapper.find({ name: 'SomeNestedRouteComponent' }).exists()).toBeTruthy()
  })
})