import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import VueRouter from "vue-router"
import App from '../src/App'
import Home from '../src/views/Home'
import SomeNestedRouteComponent from '../src/components/onlyForTests/SomeNestedRouteComponent'


const routes = [
  { path: "/", component: Home },
  { path: "/nested-route", component: SomeNestedRouteComponent }
]

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter({ routes }) 

// jest.mock("@/views/Home.vue", () => ({
//   name: "Home",
//   render: h => h("div")
// }))

describe('App', () => {
  let vuetify
  beforeEach(() => {
    vuetify = new Vuetify()
  })
  it('App is a Vue instance', () => {
    const wrapper = shallowMount(App, {
      methods: {
        initial: jest.fn()
      },
      localVue,
      vuetify
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('render Home component', () => {
    const wrapper = mount(App, {
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
      vuetify,
      router,
      localVue
    })
    expect(wrapper.find({ name: 'Home' }).exists()).toBeTruthy()
  })
  // it('render nested route component', () => {
  //   const wrapper = mount(App, {
  //     mocks: {
  //       $store: {
  //         state: {
  //           todoList: jest.fn()
  //         }
  //       }
  //     },
  //     methods: {
  //       initial: jest.fn()
  //     },
  //     localVue,
  //     router,
  //     vuetify
  //   })
  //   router.push('/nested-route')
  //   // console.log(wrapper.html())
  //   expect(wrapper.find(SomeNestedRouteComponent).exists()).toBeTruthy()
  // })
})