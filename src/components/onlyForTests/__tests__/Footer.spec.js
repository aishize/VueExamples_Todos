import Vue from 'vue'
// import Vuex from 'vuex'
import vuetify from 'vuetify'
import { shallowMount } from '@vue/test-utils'
import Footer from '../../Footer'

Vue.use(vuetify)  
// Vue.use(Vuex)
// const localVue = createLocalVue()
// localVue.use(Vuex)
// localVue.use(vuetify)

describe('Footer', () => {
  // let getters, store
  // beforeEach(() => {
  //   getters = {
  //     itemsLeft: () => 2
  //   }
  //   store = new Vuex.Store({
  //     getters
  //   })
  // })
  it('Footer is a Vue Instance', () => {
    const wrapper = shallowMount(Footer, {
      // mocks: {
      //   $store: {
      //     getters: {
      //       itemsLeft: () => 2
      //     }
      //   }
      // }
      computed: {
        itemsLeft: () => 2
      }
    })

    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})


