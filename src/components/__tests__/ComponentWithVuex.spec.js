import Vuex from "vuex"
import { shallowMount, createLocalVue } from "@vue/test-utils"
import ComponentWithVuex from "@/components/ComponentWithVuex.vue"

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
  state: {
    username: "Alice"
  }
})

describe("ComponentWithVuex", () => {
  it("отрисовывает имя пользователя из настоящего Vuex хранилища", () => {
    const wrapper = shallowMount(ComponentWithVuex, { 
      store, 
      localVue 
    })

    expect(wrapper.find(".username").text()).toBe("Alice")
  })
})