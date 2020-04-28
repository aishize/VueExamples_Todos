// import Vuex from 'vuex'
import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import Footer from '../src/components/Footer'

const localVue = createLocalVue()
// localVue.use(Vuetify)
Vue.use(Vuetify)

describe('Footer', () => {
  let vuetify
  beforeEach(() => {
    vuetify = new Vuetify()
  })
  const mountFunction = options => {
    return mount(Footer, {
      localVue,
      vuetify,
      ...options
    })
  }
  it('Footer is a Vue Instance', () => {
    const wrapper = mountFunction({
      computed: {
        itemsLeft: () => 2
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})


