import { shallowMount } from '@vue/test-utils'
import Greeting from '../src/components/onlyForTests/Greeting'

describe('greeting', () => {
  it('renders a greeting', () => {
    const wrapper = shallowMount(Greeting)
    expect(wrapper.text()).toMatch('Vue and TDD')
  })
})