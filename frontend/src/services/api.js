import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4789/api', // change IP easily here
})

export default api
