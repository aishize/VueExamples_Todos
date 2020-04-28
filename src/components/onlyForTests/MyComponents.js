import Vue from 'vue'
import instance from '@/services/instance'
// import axios from 'axios'
import Children from './Children'

export const Child = Vue.component("Child", {
  name: 'Child',
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  methods: {
    test: function () {
      return null
    }
  },
  template: `
    <div>
      <button @click="test">test</button>
      <button
        @click="$emit('custom')"
        class="custom"
      >
        {{ text }}
      </button>
    </div>
  `
})

export const Parent = Vue.component("Parent", {
  name: 'Parent',
  components: {
    Child
  },
  data: () => ({
    clicked: false
  }),
  template: `
    <div>
      <h2>Parent Component</h2>
      <Child
        text="I Love Vue!"
        @custom="clicked = !clicked"
      />
      <h3 v-if="clicked"> I love You too <3</h3>
    </div>
  `
})

export const PropsTest = Vue.component("PropsTest", {
  props: {
    msg: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  template: `
    <div>
      <span v-if="isAdmin">is admin</span>
      <span v-else>unauthorized</span>
      <button>
        {{ msg }}
      </button>
    </div>
  `
})

export const NumberRenderer = Vue.component("NumberRenderer", {
  props: {
    even: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    numbers: function () {
      const array = new Array(9).fill().map((i, j) => j + 1)
      return array.filter(i => this.even ? i % 2 === 0 : i % 2 !== 0).join(', ')
    }
  },
  template: `
    <div>
      {{ numbers }}
    </div>
  `
})

export const FormSubmitter = Vue.component("FormSubmitter", {
  data: () => ({
    username: '',
    submitted: false
  }),
  methods: {
    handleSubmitAsync: async function () {
      try {
        await instance.get('api-example/v1/register', { username: this.username })
        this.submitted = true
      } catch (error) {
        throw Error('somthing went wrong: ', error)
      }
    }
  },
  template: `
    <div>
      <form @submit.prevent="handleSubmitAsync">
        <input v-model="username" data-username>
        <input type="submit">
      </form>
      <div
        v-if="submitted"
        class="message"
      >
        Thanks for your message, {{ username }}
      </div>
    </div>
  `
})

export const Emitter = Vue.component("Emitter", {
  methods: {
    emitEvent: function () {
      this.$emit('myEvent', 'name', 'password')
    }
  },
  template: `
    <div>
    </div>
  `
})

export const ParentWithManyChildren = Vue.component('ParentWithManyChildren', {
  name: 'ParentWithManyChildren',
  components: {
    Children
  },
  data: () => ({
    number: 3
  }),
  template: `
    <div>
      <Children
        v-for="item in number"
        :key="item"
      />
    </div>
  `
})