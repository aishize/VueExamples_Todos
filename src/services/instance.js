import axios from 'axios'

const baseURL = '/example-api/v1'

const instance = axios.create({
  baseURL
})

export default instance