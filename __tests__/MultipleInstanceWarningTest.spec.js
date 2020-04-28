import { createLocalVue, mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import MultipleInstanceWarningTest from '../src/components/onlyForTests/MultipleInstanceWarningTest'

const localVue = createLocalVue()
// localVue.use(Vuetify)
Vue.use(Vuetify)

describe('MultipleInstanceWarningTest', () => {
  let vuetify
  beforeEach(() => {
    vuetify = new Vuetify()
  })
  const mountFunction = options => {
    return mount(MultipleInstanceWarningTest, {
      localVue,
      vuetify,
      ...options
    })
  }
  it('MultipleInstanceWarningTest is a Vue Instance', () => {
    const wrapper = mountFunction()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})