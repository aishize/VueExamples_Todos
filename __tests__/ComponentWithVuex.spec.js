import Vuex from "vuex"
import { shallowMount, createLocalVue } from "@vue/test-utils"
import ComponentWithVuex from "../src/components/onlyForTests/ComponentWithVuex.vue"

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
  state: {
    username: "Alice"
  }
})

describe("ComponentWithVuex", () => {
  it("renders a username using a real Vuex store", () => {
    const wrapper = shallowMount(ComponentWithVuex, { 
      store, 
      localVue 
    })

    expect(wrapper.find(".username").text()).toBe("Alice")
  })
})