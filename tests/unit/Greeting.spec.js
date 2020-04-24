// import Vue from 'vue'
import { mount, shallowMount } from '@vue/test-utils'
import { factory } from '@/util/helper'
import Greeting from '@/components/Greeting'
import flushPromises from 'flush-promises'
import {
  Parent,
  Child,
  PropsTest,
  NumberRenderer,
  FormSubmitter,
  Emitter
} from '@/components/MyComponents'

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve())
}))


describe('greeting', () => {
  it('renders a greeting', () => {
    const wrapper = mount(Greeting)
    expect(wrapper.text()).toMatch('Vue and TDD')
  })
})

describe('Parent and Child', () => {
  it('render "Parent Component" in the Parent Component', () => {
    const wrapper = shallowMount(Parent)
    expect(wrapper.text()).toMatch('Parent Component')
  })
  it('render "I love Vue!" in a button in the Сhild component', () => {
    const wrapper = mount(Child, {
      propsData: {
        text: 'I love Vue!'
      }
    })
    expect(wrapper.html()).toMatch('I love Vue!')
  })
  // it('render "I love You too <3" in a Parent Component after click button in a Child', () => {
  //   const wrapper = mount(Parent)
  //   const wrapperChild = mount(Child)
  //   wrapperChild.vm.$emit('custom')
  //   expect(wrapper.text()).toMatch('I love You too <3')
  // })
})

describe('props test', () => {
  const msg = 'login'
  describe('{ admin: false }', () => {
    it('render a message for unauthorized user', () => {
      const wrapper = factory(shallowMount, PropsTest, { msg })
      expect(wrapper.find('span').text()).toBe('unauthorized')
      expect(wrapper.find('button').text()).toBe('login')
    })
  })
  describe('{ admin: true }', () => {
    it('render a message for Admin if prop isAdmin has value true', () => {
      const wrapper = factory(shallowMount, PropsTest, { msg, isAdmin: true })
      expect(wrapper.find('span').text()).toBe('is admin')
      expect(wrapper.find('button').text()).toBe('login')
    })
  })
})

describe('NumberRenderer', () => {
  it('render [2, 4, 6, 8] if prop "even" has value true', () => {
    const wrapper = factory(shallowMount, NumberRenderer, { even: true })
    expect(wrapper.text()).toBe('2, 4, 6, 8')
  })
  it('display [1, 3, 5, 7, 9] if prop "even" has value false; (using call instead shallowMount)', () => {
    // const wrapper = factory(shallowMount, NumberRenderer, { even: false })
    // expect(wrapper.text()).toBe('1, 3, 5, 7, 9')
    const localThis = { even: false }
    expect(NumberRenderer.options.computed.numbers.call(localThis)).toBe('1, 3, 5, 7, 9')
  })
})

describe('FormSubmitter', () => {
  // let url, data
  // const mockHTTP = {
  //   get: (_url, _data) => {
  //     return new Promise(resolve => {
  //       url = _url
  //       data = _data
  //       resolve()
  //     })
  //   }
  // }

  it('render message after submit', async () => {
    const wrapper = shallowMount(FormSubmitter)
    wrapper.find('[data-username]').setValue('Alice')
    wrapper.find('form').trigger('submit.prevent')

    await flushPromises()

    expect(wrapper.find('.message').text())
      .toBe('Thanks for your message, Alice')
  })
})

describe('Emitter', () => {
  it('emits an event with two arguments', () => {
    const wrapper = mount(Emitter)
    wrapper.vm.emitEvent()
    expect(wrapper.emitted().myEvent[0]).toEqual(['name','password'])
  })
  it('emits an event without mounting the component', () => {
    const events = {}
    const $emit = (event, ...args) => { events[event] = [...args] }

    Emitter.options.methods.emitEvent.call({ $emit })

    expect(events.myEvent).toEqual(['name', 'password'])
  })
})