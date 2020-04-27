import Vue from 'vue'
import axios from 'axios'

export const asyncChild = Vue.component('asyncChild', {
  created: async function () {
    this.makeApiCall()
  },
  methods: {
    makeApiCall: async function () {
      console.log('making api call')
      await axios.get('https://jsonplaceholder.typicode.com/posts/1')
    }
  },
  template: `
    <div />
  `
})

export const asyncParent = Vue.component('asyncParent', {
  components: {
    asyncChild
  },
  template: `
    <div>
      <asyncChild />
    </div>
  `
})

